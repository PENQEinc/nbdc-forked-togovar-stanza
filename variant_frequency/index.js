const POPULATION_LABEL = {
  "JGA-NGS": "Japanese",
  "JGA-SNP": "Japanese",
  "3.5k JPN": "Japanese",
  "HGVD": "Japanese",
  "ExAC": "Total"
};

const ORDER_WEIGHT = {
  "JGA-NGS": 10,
  "JGA-SNP": 20,
  "3.5k JPN": 30,
  "HGVD": 40,
  "ExAC": 50,
  "African/African American": 1,
  "American": 2,
  "East Asian": 3,
  "Finnish": 4,
  "Non-Finnish European": 5,
  "Other": 6,
  "South Asian": 7
};

Stanza(function (stanza, params) {
  stanza.handlebars.registerHelper("locale_string", (str) => {
    return str ? parseInt(str).toLocaleString() : "";
  });

  stanza.handlebars.registerHelper("format_float", (str) => {
    let v = parseFloat(str);

    if (v === 0)
      return "0.0";
    else if (v === 1)
      return "1.0";
    else if (v < 0.001)
      return v.toExponential(3);
    else
      return Math.round(v * Math.pow(10, 3)) / Math.pow(10, 3);
  });

  stanza.handlebars.registerHelper("format_filter", (str) => {
    if (!str || str === "") {
      return "-"
    }

    let status = str.split(",")[0];

    if (status === "") {
      return "-"
    } else if (status === "PASS") {
      return "<span class=\"green\">PASS</span>";
    } else {
      return "<span class=\"red\">" + status + "</span>";
    }
  });

  let url = (params.api ? params.api : "").concat("/variant_frequency?tgv_id=", params.tgv_id);

  if (params.ep) {
    url = url.concat("&ep=", encodeURIComponent(params.ep))
  }

  fetch(url, {method: "GET", headers: {"Accept": "application/json"}}).then(function (response) {
    if (response.ok) {
      return response.json();
    }
  }).then(function (json) {
    let bindings = stanza.unwrapValueFromBinding(json);

    bindings.forEach(function (binding) {
      let x = binding.source.split(':');
      binding.dataset = x[0];
      binding.population = x[1] || POPULATION_LABEL[x[0]] || "-";
      binding.order = (ORDER_WEIGHT[x[0]] || 0) + (ORDER_WEIGHT[x[1]] || 0);
    });

    bindings.sort(function (a, b) {
      return a.order - b.order;
    });

    stanza.render({
      template: "stanza.html",
      parameters: {
        bindings: bindings
      }
    });
  }).catch(function (e) {
    stanza.root.querySelector("main").innerHTML = "<p>" + e.message + "</p>";
    throw e;
  });
});
