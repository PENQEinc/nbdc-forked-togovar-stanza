import { D as DATASETS, S as SO, e as ensureAllDatasets, C as CONSEQUENCE, a as SIFT, P as POLYPHEN } from './constants-24988aba.js';

const sortBy = (array, fn) => array.sort((a, b) => {
  return (fn(a) || Number.MAX_SAFE_INTEGER) - (fn(b) || Number.MAX_SAFE_INTEGER);
});

const floatFormatter = digits => {
  return new Intl.NumberFormat("en", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
};

const fractionDigits3 = floatFormatter(3);

const refAlt = (ref, alt) => {
  const ref_length = ref?.length || 0;
  const alt_length = alt?.length || 0;

  if (!ref) {
    ref = "";
  }
  if (!alt) {
    alt = "";
  }

  if (ref_length > 4) {
    ref = ref.slice(0, 4) + "...";
  }
  if (alt_length > 4) {
    alt = alt.slice(0, 4) + "...";
  }

  return {ref, alt, ref_length, alt_length};
};

const variantType = accession => ({type: SO[accession]?.label || "Unknown"});

const frequency = (count, frequency) => {
  const level = ((ac, f) => {
    if (isNaN(ac)) {
      return "na";
    } else if (ac === 0) {
      return "monomorphic";
    } else if (ac === 1) {
      return "singleton";
    } else if (f < 0.0001) {
      return "<0.0001";
    } else if (0.0001 <= f && f < 0.001) {
      return "<0.001";
    } else if (0.001 <= f && f < 0.01) {
      return "<0.01";
    } else if (0.01 <= f && f < 0.05) {
      return "<0.05";
    } else if (0.05 <= f && f < 0.5) {
      return "<0.5";
    } else if (0.5 <= f && f) {
      return "≥0.5";
    } else {
      return "na";
    }
  })(count, frequency);

  frequency = ((v) => {
    if (v === 0) {
      return "0.0";
    } else if (v === 1) {
      return "1.0";
    } else if (v < 0.001) {
      return v.toExponential(3);
    } else {
      return fractionDigits3.format(frequency);
    }
  })(frequency);

  return {frequency, count, level};
};

const consequence = accession => ({most_severe_consequence: CONSEQUENCE[accession]?.label || ""});

const sift = value => {
  value = parseFloat(value);

  if (isNaN(value)) {
    return {};
  }

  const rank = (value >= 0.05) ? SIFT["tolerated"] : SIFT["deleterious"];

  return {
    sift: fractionDigits3.format(value),
    sift_class: rank?.key,
    sift_label: rank?.label,
  };
};

const polyphen = value => {
  value = parseFloat(value);

  if (isNaN(value)) {
    return {};
  }

  let rank = POLYPHEN["unknown"];
  if (value > 0.908) {
    rank = POLYPHEN["probably_damaging"];
  } else if (value > 0.446) {
    rank = POLYPHEN["possibly_damaging"];
  } else {
    rank = POLYPHEN["benign"];
  }

  return {
    polyphen: fractionDigits3.format(value),
    polyphen_class: rank?.key,
    polyphen_label: rank?.label,
  };
};

const transformRecord = record => {
  const datasets = Object.values(DATASETS);

  Object.assign(record, variantType(record.type));
  Object.assign(record, refAlt(record.reference, record.alternative));

  if (!record.frequencies) {
    record.frequencies = [];
  }
  ensureAllDatasets(record.frequencies);
  sortBy(record.frequencies, x => datasets.find(y => y.id === x.source)?.idx);
  record.frequencies.forEach(x => {
    const ac = parseInt(x.allele?.count);
    const freq = parseFloat(x.allele?.frequency);

    Object.assign(x, frequency(ac, freq));
  });

  Object.assign(record, consequence(record.most_severe_consequence));
  if (record.transcripts && record.transcripts.length > 1) {
    record.consequence_badge = `${record.transcripts.length - 1}+`;
  }

  Object.assign(record, sift(record.sift));
  Object.assign(record, polyphen(record.polyphen));

  if (record.significance && record.significance.length > 1) {
    record.significance_badge = `${record.significance.length - 1}+`;
  }
  if (record.significance && record.significance.length > 0) {
    record.significance = record.significance[0];
    record.significance.interpretation = record.significance.interpretations[0];
  }

  return record;
};

export { sift as a, frequency as f, polyphen as p, refAlt as r, sortBy as s, transformRecord as t };
//# sourceMappingURL=display-87c61d49.js.map
