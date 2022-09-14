import { S as Stanza, d as defineStanzaElement } from './stanza-d28b983d.js';
import { D as DATASETS } from './constants-24988aba.js';
import { f as frequency, s as sortBy } from './display-87c61d49.js';

class VariantSummary extends Stanza {
  async render() {
    this.importWebFontCSS("https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700,900");
    this.importWebFontCSS(new URL("./assets/fontello.css", import.meta.url));

    const sparqlist = (this.params?.sparqlist || "/sparqlist").concat(`/api/variant_frequency?tgv_id=${this.params.tgv_id}`);

    const r = await fetch(sparqlist, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(sparqlist + " returns status " + response.status);
    }).then(function (bindings) {
      const datasets = Object.values(DATASETS);

      bindings.forEach(function (binding) {
        const dataset = datasets.find(x => x.source === binding.source);
        const ac = parseInt(binding.num_alt_alleles);
        const freq = parseFloat(binding.frequency);

        const localeString = (v) => v ? parseInt(v).toLocaleString() : null;

        binding.key = dataset?.id;
        binding.dataset = dataset?.dataset;
        binding.population = dataset?.population;
        binding.class_name = binding.source.startsWith("ExAC:") ? "none" : "";
        binding.num_alleles = localeString(binding.num_alleles);
        binding.num_alt_alleles = localeString(binding.num_alt_alleles);
        binding.num_genotype_alt_homo = localeString(binding.num_genotype_alt_homo);
        binding.num_genotype_hetero = localeString(binding.num_genotype_hetero);
        binding.num_genotype_ref_homo = localeString(binding.num_genotype_ref_homo);

        Object.assign(binding, frequency(ac, freq));
      });

      sortBy(bindings, x => datasets.find(y => y.source === x.source)?.idx);

      return {result: {bindings: bindings}};
    }).catch(e => ({error: {message: e.message}}));

    this.renderTemplate({
      template: "stanza.html.hbs",
      parameters: {
        params: this.params,
        ...r,
      },
    });

    const gnomad_genomes = this.root.querySelector("#gnomad_genomes");
    if (gnomad_genomes) {
      const gnomad_genomes_total = this.root.querySelector("tr[data-dataset='gnomad_genomes']");
      const gnomad_genomes_subset = this.root.querySelectorAll("tr[data-dataset^='gnomad_genomes_']");

      gnomad_genomes.addEventListener("click", function () {
        gnomad_genomes.classList.toggle("open");
        gnomad_genomes_total.classList.toggle("close");

        gnomad_genomes_subset.forEach(x => x.classList.toggle("none"));
      });
    }

    const gnomad_exomes = this.root.querySelector("#gnomad_exomes");
    if (gnomad_exomes) {
      const gnomad_exomes_total = this.root.querySelector("tr[data-dataset='gnomad_exomes']");
      const gnomad_exomes_subset = this.root.querySelectorAll("tr[data-dataset^='gnomad_exomes_']");

      gnomad_exomes.addEventListener("click", function () {
        gnomad_exomes.classList.toggle("open");
        gnomad_exomes_total.classList.toggle("close");

        gnomad_exomes_subset.forEach(x => x.classList.toggle("none"));
      });
    }
  }
}

var stanzaModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': VariantSummary
});

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "variant-frequency",
	"stanza:label": "Variant / Frequency",
	"stanza:definition": "Display alternative allele frequencies of the variant",
	"stanza:type": "Stanza",
	"stanza:display": "Table",
	"stanza:provider": "TogoVar",
	"stanza:license": "MIT",
	"stanza:author": "Daisuke Satoh",
	"stanza:address": "daisuke.satoh@lifematics.co.jp",
	"stanza:contributor": [
],
	"stanza:created": "2019-04-22",
	"stanza:updated": "2022-04-15",
	"stanza:parameter": [
	{
		"stanza:key": "tgv_id",
		"stanza:example": "tgv219804",
		"stanza:description": "TogoVar ID",
		"stanza:required": true
	},
	{
		"stanza:key": "sparqlist",
		"stanza:example": "https://togovar.biosciencedbc.jp/sparqlist",
		"stanza:description": "SPARQList URL",
		"stanza:required": false
	}
],
	"stanza:about-link-placement": "bottom-right",
	"stanza:style": [
]
};

var templates = [
  ["stanza.html.hbs", {"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"alert alert-danger\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"message") || (depth0 != null ? lookupProperty(depth0,"message") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"message","hash":{},"data":data,"loc":{"start":{"line":2,"column":34},"end":{"line":2,"column":45}}}) : helper)))
    + "</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"with").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"result") : depth0),{"name":"with","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":2},"end":{"line":50,"column":11}}})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <table class=\"table frequency-detail\">\n      <thead>\n      <tr>\n        <th rowspan=\"2\">Dataset</th>\n        <th rowspan=\"2\">Population</th>\n        <th colspan=\"4\">Allele count</th>\n        <th colspan=\"3\">Genotype count</th>\n        <th class=\"filter_status\" rowspan=\"2\">Filter status</th>\n        <th rowspan=\"2\">Quality score</th>\n      </tr>\n      <tr>\n        <th class=\"alt\">Alt</th>\n        <th>Total</th>\n        <th class=\"frequency\">Frequency</th>\n        <th></th>\n        <th class=\"num_genotype_alt_homo alt\">Alt / Alt</th>\n        <th class=\"num_genotype_hetero\">Alt / Ref</th>\n        <th class=\"num_genotype_ref_homo\">Ref / Ref</th>\n      </tr>\n      </thead>\n\n      <tbody>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"bindings") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":27,"column":6},"end":{"line":47,"column":15}}})) != null ? stack1 : "")
    + "      </tbody>\n    </table>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <tr data-dataset=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (depth0 != null ? lookupProperty(depth0,"key") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":28,"column":26},"end":{"line":28,"column":33}}}) : helper)))
    + "\" class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"class_name") || (depth0 != null ? lookupProperty(depth0,"class_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class_name","hash":{},"data":data,"loc":{"start":{"line":28,"column":42},"end":{"line":28,"column":56}}}) : helper)))
    + "\">\n          <td class=\"dataset\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (depth0 != null ? lookupProperty(depth0,"key") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":29,"column":34},"end":{"line":29,"column":41}}}) : helper)))
    + "\" data-dataset=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (depth0 != null ? lookupProperty(depth0,"key") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":29,"column":57},"end":{"line":29,"column":64}}}) : helper)))
    + "\">\n            <div class=\"dataset-icon\" data-dataset=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (depth0 != null ? lookupProperty(depth0,"key") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":30,"column":52},"end":{"line":30,"column":59}}}) : helper)))
    + "\"></div>"
    + alias4(((helper = (helper = lookupProperty(helpers,"dataset") || (depth0 != null ? lookupProperty(depth0,"dataset") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"dataset","hash":{},"data":data,"loc":{"start":{"line":30,"column":67},"end":{"line":30,"column":78}}}) : helper)))
    + "\n          </td>\n          <td class=\"population\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"population") || (depth0 != null ? lookupProperty(depth0,"population") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"population","hash":{},"data":data,"loc":{"start":{"line":32,"column":33},"end":{"line":32,"column":47}}}) : helper)))
    + "</td>\n          <td class=\"num_alt_alleles\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"num_alt_alleles") || (depth0 != null ? lookupProperty(depth0,"num_alt_alleles") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"num_alt_alleles","hash":{},"data":data,"loc":{"start":{"line":33,"column":38},"end":{"line":33,"column":57}}}) : helper)))
    + "<span class=\"slash\">/</span></td>\n          <td class=\"num_alleles\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"num_alleles") || (depth0 != null ? lookupProperty(depth0,"num_alleles") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"num_alleles","hash":{},"data":data,"loc":{"start":{"line":34,"column":34},"end":{"line":34,"column":49}}}) : helper)))
    + "</td>\n          <td class=\"frequency\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"frequency") || (depth0 != null ? lookupProperty(depth0,"frequency") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"frequency","hash":{},"data":data,"loc":{"start":{"line":35,"column":32},"end":{"line":35,"column":45}}}) : helper)))
    + "</td>\n          <td class=\"frequency-graph\">\n            <div class=\"allele-frequency-graph\">\n              <span class=\"dataset\" data-frequency=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"level") || (depth0 != null ? lookupProperty(depth0,"level") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"level","hash":{},"data":data,"loc":{"start":{"line":38,"column":52},"end":{"line":38,"column":61}}}) : helper)))
    + "\" data-dataset=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (depth0 != null ? lookupProperty(depth0,"key") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":38,"column":77},"end":{"line":38,"column":84}}}) : helper)))
    + "\"></span>\n            </div>\n          </td>\n          <td class=\"num_genotype_alt_homo\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"num_genotype_alt_homo") || (depth0 != null ? lookupProperty(depth0,"num_genotype_alt_homo") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"num_genotype_alt_homo","hash":{},"data":data,"loc":{"start":{"line":41,"column":44},"end":{"line":41,"column":69}}}) : helper)))
    + "</td>\n          <td class=\"num_genotype_hetero\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"num_genotype_hetero") || (depth0 != null ? lookupProperty(depth0,"num_genotype_hetero") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"num_genotype_hetero","hash":{},"data":data,"loc":{"start":{"line":42,"column":42},"end":{"line":42,"column":65}}}) : helper)))
    + "</td>\n          <td class=\"num_genotype_ref_homo\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"num_genotype_ref_homo") || (depth0 != null ? lookupProperty(depth0,"num_genotype_ref_homo") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"num_genotype_ref_homo","hash":{},"data":data,"loc":{"start":{"line":43,"column":44},"end":{"line":43,"column":69}}}) : helper)))
    + "</td>\n          <td class=\"filter\" data-filter=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"filter") || (depth0 != null ? lookupProperty(depth0,"filter") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"filter","hash":{},"data":data,"loc":{"start":{"line":44,"column":42},"end":{"line":44,"column":52}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"filter") || (depth0 != null ? lookupProperty(depth0,"filter") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"filter","hash":{},"data":data,"loc":{"start":{"line":44,"column":54},"end":{"line":44,"column":64}}}) : helper)))
    + "</td>\n          <td class=\"quality\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"quality") || (depth0 != null ? lookupProperty(depth0,"quality") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quality","hash":{},"data":data,"loc":{"start":{"line":45,"column":30},"end":{"line":45,"column":41}}}) : helper)))
    + "</td>\n        </tr>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"with").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"error") : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":51,"column":9}}})) != null ? stack1 : "");
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=variant-frequency.js.map
