import { unwrapValueFromBinding } from "togostanza/utils";

import type { SparqlistStanzaParams } from "./types";

/**
 * tgv_id / variant(VCF表記に限らずsparqlist側が受理する表記) と追加パラメータから、
 * 空文字/未指定の項目を除いたクエリ文字列を組み立てる。この関数自体は値の有無を検証しない
 * (空文字/undefinedは単に除外するだけで、両方無くてもエラーにはしない)。
 * sparqlist側は tgv_id があればそれを優先し、無ければ variant で解決する。
 * どちらも無い場合にエラーにするかは呼び出し元の責任で、sparqlist側のスクリプトが
 * 自前でエラーを投げる場合(variant_summary等)と、stanza側で事前に
 * assertValidVariantIdentifier を呼んで早期に分かりやすいエラーを出す場合(variant-mgend等)がある。
 * 後者はVCF表記(CHROM-POS-REF-ALT)の厳密パースを要求するため、sparqlistがより緩い表記
 * (例: "12:111803962:G>A")も受理するstanzaでは使えない点に注意。
 * sparqlist を必須化していないstanza(フォールバックURL方式)からも共通で使うため、
 * URL全体の組み立て(buildSparqlistApiUrl)とは切り離してある。
 */
export const buildIdentifierQueryString = (
  { tgv_id, variant }: Pick<SparqlistStanzaParams, "tgv_id" | "variant">,
  additionalParams: Record<string, string | undefined> = {},
): string => {
  const queryParams = new URLSearchParams();
  Object.entries({ tgv_id, variant, ...additionalParams }).forEach(
    ([key, value]) => {
      if (value !== undefined && value !== "") {
        queryParams.set(key, value);
      }
    },
  );

  return queryParams.toString();
};

/**
 * SPARQList の API エンドポイント URL を組み立てる。
 * sparqlist が未指定の場合は throw する(暗黙のフォールバックだと埋め込み側の設定ミスに気づきにくいため)。
 * URLSearchParams で値と追加パラメータをエスケープする。
 */
export const buildSparqlistApiUrl = (
  endpoint: string,
  params: SparqlistStanzaParams,
  additionalParams: Record<string, string | undefined> = {},
): string => {
  if (!params.sparqlist) {
    throw new Error("sparqlist parameter is required");
  }

  const queryString = buildIdentifierQueryString(params, additionalParams);
  const baseUrl = params.sparqlist.replace(/\/+$/, "");

  return `${baseUrl}/api/${endpoint}?${queryString}`;
};

/**
 * エラーメッセージ表示用に、tgv_id / variant のうち指定されている方の識別子を返す。
 * どちらも無い場合は空文字を返す。
 */
export const describeVariantIdentifier = ({
  tgv_id,
  variant,
}: SparqlistStanzaParams): string => tgv_id || variant || "";

/**
 * SPARQList エンドポイントから SPARQL バインディングを取得し、
 * `{ value: "..." }` ラッパーを剥がしたプレーンオブジェクト配列として返す。
 * HTTP エラーは Error を throw し、呼び出し元の render() でまとめてハンドリングする。
 *
 * Accept は `application/sparql-results+json` を指定する。`application/json` だと
 * ALTが長い挿入変異など一部のクエリでSPARQList側が空の bindings を返すことがあるため
 * （レスポンスの形式自体は同じSPARQL結果JSON）、標準のMIMEタイプで明示的にリクエストする。
 */
export const fetchSparqlBindings = async <T>(apiUrl: string): Promise<T[]> => {
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: { Accept: "application/sparql-results+json" },
  });

  if (!response.ok) {
    throw new Error(`${apiUrl} returns status ${response.status}`);
  }

  const json = await response.json();
  return unwrapValueFromBinding(json) as T[];
};

/**
 * バインディング配列から該当する1件(先頭)を取り出す。
 * 空の場合は notFoundMessage を持つ Error を throw する。
 * こうすることで、該当データなしのケースも呼び出し元の catch へ合流させ、
 * result・error のどちらもセットされない「空表示」を防ぐ。
 */
export const requireFirstBinding = <T>(
  bindings: T[],
  notFoundMessage: string,
): T => {
  const firstBinding = bindings[0];
  if (!firstBinding) {
    throw new Error(notFoundMessage);
  }

  return firstBinding;
};
