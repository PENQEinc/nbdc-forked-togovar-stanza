import { S as Stanza, d as defineStanzaElement } from './stanza-d28b983d.js';
import { u as unwrapValueFromBinding } from './utils-7957268f.js';
import { b as CLINICAL_SIGNIFICANCE, R as REVIEW_STATUS } from './constants-24988aba.js';

const rowSpanize = table => {
  if (!table) {
    return;
  }

  let arr = [];

  table.querySelectorAll("tr").forEach((tr) => {
    tr.querySelectorAll("td").forEach((td, i) => {
      let td_html = td.innerHTML;
      if (typeof arr[i] != "undefined" && "html" in arr[i] && arr[i].html === td_html) {
        let rs = parseInt(arr[i].elem.getAttribute("data-rowspan")) || 1;
        arr[i].elem.setAttribute("data-rowspan", rs + 1);
        arr[i].elem.classList.add("rowspan-combine");
        td.classList.add("rowspan-remove");
      } else {
        arr[i] = {html: td_html, elem: td};
      }
    });
  });

  table.querySelectorAll(".rowspan-combine").forEach((tr) => {
    tr.setAttribute("rowspan", tr.getAttribute("data-rowspan"));
    tr.removeAttribute("data-rowspan");
  });

  table.querySelectorAll(".rowspan-remove").forEach((td) => {
    td.parentNode.removeChild(td);
  });
};

class VariantSummary extends Stanza {
  async render() {
    this.importWebFontCSS("https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700,900");

    const sparqlist = (this.params?.sparqlist || "/sparqlist").concat(`/api/variant_clinvar?tgv_id=${this.params.tgv_id}`);

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
      let bindings = unwrapValueFromBinding(json);

      bindings.forEach(function (binding) {
        binding.significance_class = CLINICAL_SIGNIFICANCE[binding.interpretation?.toLowerCase()]?.key;
        binding.stars = REVIEW_STATUS[binding.review_status]?.stars || 0;
        binding.condition = {
          label: binding.condition,
          url: "https://identifiers.org/medgen:".concat(binding.medgen),
        };
      });

      return {result: bindings};
    }).catch(e => ({error: {message: e.message}}));

    this.renderTemplate({
      template: "stanza.html.hbs",
      parameters: {
        params: this.params,
        ...r,
      },
    });

    rowSpanize(this.root.querySelector("#target"));
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
	"@id": "variant-clinvar",
	"stanza:label": "Variant / ClinVar",
	"stanza:definition": "Display ClinVar annotations of the variant",
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

  return "  <table id=\"target\" class=\"table\">\n    <thead>\n    <tr>\n      <th>Title</th>\n      <th>Clinical significance</th>\n      <th>Review status</th>\n      <th>Last evaluated</th>\n      <th>Condition(s)</th>\n    </tr>\n    </thead>\n\n    <tbody>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"result") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":16,"column":4},"end":{"line":42,"column":13}}})) != null ? stack1 : "")
    + "    </tbody>\n  </table>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <tr>\n        <td class=\"title\">\n          <a href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"clinvar") || (depth0 != null ? lookupProperty(depth0,"clinvar") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"clinvar","hash":{},"data":data,"loc":{"start":{"line":19,"column":19},"end":{"line":19,"column":30}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":19,"column":32},"end":{"line":19,"column":41}}}) : helper)))
    + "</a>\n        </td>\n        <td class=\"clinical-significance-col\">\n          <span class=\"clinical-significance-full\" data-sign=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"significance_class") || (depth0 != null ? lookupProperty(depth0,"significance_class") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"significance_class","hash":{},"data":data,"loc":{"start":{"line":22,"column":62},"end":{"line":22,"column":84}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"interpretation") || (depth0 != null ? lookupProperty(depth0,"interpretation") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"interpretation","hash":{},"data":data,"loc":{"start":{"line":22,"column":86},"end":{"line":22,"column":104}}}) : helper)))
    + "</span>\n        </td>\n        <td class=\"review-status\">\n        <span class=\"star-rating\">\n          <span data-stars=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"stars") || (depth0 != null ? lookupProperty(depth0,"stars") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stars","hash":{},"data":data,"loc":{"start":{"line":26,"column":28},"end":{"line":26,"column":37}}}) : helper)))
    + "\" class=\"star-rating-item\"></span>\n        </span>\n          <br/>\n          <span class=\"status-description\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"review_status") || (depth0 != null ? lookupProperty(depth0,"review_status") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"review_status","hash":{},"data":data,"loc":{"start":{"line":29,"column":43},"end":{"line":29,"column":60}}}) : helper)))
    + "</span>\n        </td>\n        <td class=\"last-evaluated\">\n          "
    + alias4(((helper = (helper = lookupProperty(helpers,"last_evaluated") || (depth0 != null ? lookupProperty(depth0,"last_evaluated") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"last_evaluated","hash":{},"data":data,"loc":{"start":{"line":32,"column":10},"end":{"line":32,"column":28}}}) : helper)))
    + "\n        </td>\n        <td class=\"condition\">\n          <a href=\""
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"condition") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\">"
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"condition") : depth0)) != null ? lookupProperty(stack1,"label") : stack1), depth0))
    + "</a>\n        </td>\n      </tr>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "      <tr>\n        <td class=\"text-center\" colspan=\"5\">No data</td>\n      </tr>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"with").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"error") : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":45,"column":9}}})) != null ? stack1 : "");
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=variant-clinvar.js.map
