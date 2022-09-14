import { S as Stanza, d as defineStanzaElement } from './stanza-d28b983d.js';
import { t as transformRecord } from './display-87c61d49.js';
import './constants-24988aba.js';

class GeneVariant extends Stanza {
  async render() {
    this.importWebFontCSS("https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700,900");

    const sparqlist = (this.params?.sparqlist || "/sparqlist").concat(`/api/gene_variant?hgnc_id=${this.params.hgnc_id}`);

    const r = await fetch(sparqlist, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(sparqlist + " returns status " + res.status);
    }).then(json => {
      let  records = json.data ? json.data.filter(x => x.symbols.find(y => y.id !== this.params.hgnc_id)) : [];

      records.forEach(record => {
        transformRecord(record);

        if (record.existing_variations) {
          record.dbsnp = record.existing_variations[0];
        }
        if (record.existing_variations && record.existing_variations.length > 1){
          record.dbsnp_badge = `${record.existing_variations.length - 1}+`;
        }
      });

      return {result: {data: records}};
    }).catch(e => ({error: {message: e.message}}));

    this.renderTemplate({
      template: "stanza.html.hbs",
      parameters: {
        params: this.params,
        ...r,
      },
    });
  }
}

var stanzaModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': GeneVariant
});

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gene-variant",
	"stanza:label": "Gene / Variants",
	"stanza:definition": "Display variants that exists on the gene",
	"stanza:type": "Stanza",
	"stanza:display": "Table",
	"stanza:provider": "Togovar",
	"stanza:license": "MIT",
	"stanza:author": "Shuichi Tahara",
	"stanza:address": "tahara@biosciencedbc.jp",
	"stanza:contributor": [
],
	"stanza:created": "2021-06-01",
	"stanza:updated": "2022-04-15",
	"stanza:parameter": [
	{
		"stanza:key": "hgnc_id",
		"stanza:example": "404",
		"stanza:description": "HGNC ID",
		"stanza:required": true
	},
	{
		"stanza:key": "sparqlist",
		"stanza:example": "https://togovar.biosciencedbc.jp/sparqlist",
		"stanza:description": "SPARQList URL",
		"stanza:required": false
	}
],
	"stanza:menu-placement": "bottom-right",
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

  return ((stack1 = lookupProperty(helpers,"with").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"result") : depth0),{"name":"with","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":2},"end":{"line":91,"column":11}}})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"within-sticky-table-header\">\n      <table class=\"table other_alternative_alleles\">\n        <thead>\n        <tr>\n          <th>TogoVar ID</th>\n          <th>RefSNP ID</th>\n          <th>Position</th>\n          <th>Ref / Alt</th>\n          <th>Type</th>\n          <th>Gene</th>\n          <th>Alt frequency</th>\n          <th>Consequence</th>\n          <th>SIFT</th>\n          <th>PolyPhen</th>\n          <th>Clinical Significance</th>\n        </tr>\n        </thead>\n        <tbody>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"data") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(17, data, 0),"data":data,"loc":{"start":{"line":23,"column":8},"end":{"line":87,"column":17}}})) != null ? stack1 : "")
    + "        </tbody>\n      </table>\n    </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <tr>\n            <td class=\"id\">\n              <a href=\"/variant/"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":26,"column":32},"end":{"line":26,"column":38}}}) : helper)))
    + "\">\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":27,"column":16},"end":{"line":27,"column":22}}}) : helper)))
    + "\n              </a>\n            </td>\n            <td class=\"dbsnp\">\n              <a href=\"https://identifiers.org/dbsnp/"
    + alias4(((helper = (helper = lookupProperty(helpers,"dbsnp") || (depth0 != null ? lookupProperty(depth0,"dbsnp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"dbsnp","hash":{},"data":data,"loc":{"start":{"line":31,"column":53},"end":{"line":31,"column":62}}}) : helper)))
    + "\">\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"dbsnp") || (depth0 != null ? lookupProperty(depth0,"dbsnp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"dbsnp","hash":{},"data":data,"loc":{"start":{"line":32,"column":16},"end":{"line":32,"column":25}}}) : helper)))
    + "\n              </a>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"dbsnp_badge") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":34,"column":14},"end":{"line":36,"column":21}}})) != null ? stack1 : "")
    + "            </td>\n            <td class=\"chromosome\">\n              <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"chromosome") || (depth0 != null ? lookupProperty(depth0,"chromosome") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"chromosome","hash":{},"data":data,"loc":{"start":{"line":39,"column":20},"end":{"line":39,"column":34}}}) : helper)))
    + ": </span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"start") || (depth0 != null ? lookupProperty(depth0,"start") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start","hash":{},"data":data,"loc":{"start":{"line":39,"column":43},"end":{"line":39,"column":52}}}) : helper)))
    + "\n            </td>\n            <td>\n              <div class=\"ref-alt\">\n                <span class='ref' data-sum='"
    + alias4(((helper = (helper = lookupProperty(helpers,"ref_length") || (depth0 != null ? lookupProperty(depth0,"ref_length") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ref_length","hash":{},"data":data,"loc":{"start":{"line":43,"column":44},"end":{"line":43,"column":58}}}) : helper)))
    + "'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"ref") || (depth0 != null ? lookupProperty(depth0,"ref") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ref","hash":{},"data":data,"loc":{"start":{"line":43,"column":60},"end":{"line":43,"column":67}}}) : helper)))
    + "</span><span class='arrow'></span><span\n                  class='alt' data-sum='"
    + alias4(((helper = (helper = lookupProperty(helpers,"alt_length") || (depth0 != null ? lookupProperty(depth0,"alt_length") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"alt_length","hash":{},"data":data,"loc":{"start":{"line":44,"column":40},"end":{"line":44,"column":54}}}) : helper)))
    + "'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"alt") || (depth0 != null ? lookupProperty(depth0,"alt") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"alt","hash":{},"data":data,"loc":{"start":{"line":44,"column":56},"end":{"line":44,"column":63}}}) : helper)))
    + "</span>\n              </div>\n            </td>\n            <td class=\"type\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":47,"column":29},"end":{"line":47,"column":37}}}) : helper)))
    + "</td>\n            <td class=\"gene\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"symbols") : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":49,"column":14},"end":{"line":51,"column":23}}})) != null ? stack1 : "")
    + "            </td>\n            <td class=\"frequency\">\n              <div class=\"frequency-graph\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"frequencies") : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":55,"column":16},"end":{"line":57,"column":25}}})) != null ? stack1 : "")
    + "              </div>\n            </td>\n            <td class=\"consequence\">\n              "
    + alias4(((helper = (helper = lookupProperty(helpers,"most_severe_consequence") || (depth0 != null ? lookupProperty(depth0,"most_severe_consequence") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"most_severe_consequence","hash":{},"data":data,"loc":{"start":{"line":61,"column":14},"end":{"line":61,"column":41}}}) : helper)))
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"consequence_badge") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":62,"column":14},"end":{"line":64,"column":21}}})) != null ? stack1 : "")
    + "            </td>\n            <td class=\"sift\">\n              <span class=\"variant-function\" data-function=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"sift_class") || (depth0 != null ? lookupProperty(depth0,"sift_class") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sift_class","hash":{},"data":data,"loc":{"start":{"line":67,"column":60},"end":{"line":67,"column":74}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"sift") || (depth0 != null ? lookupProperty(depth0,"sift") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sift","hash":{},"data":data,"loc":{"start":{"line":67,"column":76},"end":{"line":67,"column":84}}}) : helper)))
    + "</span>\n            </td>\n            <td class=\"polyphen\">\n              <span class=\"variant-function\" data-function=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"polyphen_class") || (depth0 != null ? lookupProperty(depth0,"polyphen_class") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"polyphen_class","hash":{},"data":data,"loc":{"start":{"line":70,"column":60},"end":{"line":70,"column":78}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"polyphen") || (depth0 != null ? lookupProperty(depth0,"polyphen") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"polyphen","hash":{},"data":data,"loc":{"start":{"line":70,"column":80},"end":{"line":70,"column":92}}}) : helper)))
    + "</span>\n            </td>\n            <td class=\"clinical_significance_wrapper\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"significance") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":73,"column":14},"end":{"line":80,"column":21}}})) != null ? stack1 : "")
    + "            </td>\n          </tr>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <span class=\"badge\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"dbsnp_badge") || (depth0 != null ? lookupProperty(depth0,"dbsnp_badge") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"dbsnp_badge","hash":{},"data":data,"loc":{"start":{"line":35,"column":36},"end":{"line":35,"column":51}}}) : helper)))
    + "</span>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <a href=\"https://identifiers.org/hgnc/"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":50,"column":54},"end":{"line":50,"column":60}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":50,"column":62},"end":{"line":50,"column":70}}}) : helper)))
    + "</a>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                  <div class=\"dataset\" data-dataset=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"source") : depth0), depth0))
    + "\" data-frequency=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"level") : depth0), depth0))
    + "\"></div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <span class=\"badge\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"consequence_badge") || (depth0 != null ? lookupProperty(depth0,"consequence_badge") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"consequence_badge","hash":{},"data":data,"loc":{"start":{"line":63,"column":36},"end":{"line":63,"column":57}}}) : helper)))
    + "</span>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <span class=\"clinical-significance\" data-sign=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"significance") : depth0)) != null ? lookupProperty(stack1,"interpretation") : stack1), depth0))
    + "\">\n                  "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"significance") : depth0)) != null ? lookupProperty(stack1,"condition") : stack1), depth0))
    + "\n                </span>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"significance_badge") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":77,"column":16},"end":{"line":79,"column":23}}})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                  <span class=\"badge\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"significance_badge") || (depth0 != null ? lookupProperty(depth0,"significance_badge") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"significance_badge","hash":{},"data":data,"loc":{"start":{"line":78,"column":38},"end":{"line":78,"column":60}}}) : helper)))
    + "</span>\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "          <tr>\n            <td class=\"text-center\" colspan=\"8\">No data</td>\n          </tr>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"with").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"error") : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":92,"column":9}}})) != null ? stack1 : "");
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=gene-variant.js.map
