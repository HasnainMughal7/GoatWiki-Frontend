import WorldMap from "react-svg-worldmap";
import "./Map.css";

function Map() {
  const data = [
    { country: "in", value: 150000000 }, // India
    { country: "cn", value: 132400000 }, // China
    { country: "ng", value: 88000000 }, // Nigeria
    { country: "pk", value: 82500000 }, // Pakistan
    { country: "BD", value: 60000000 }, // Bangladesh
    { country: "ET", value: 49300000 }, // Ethiopia
    { country: "TD", value: 46400000 }, // Chad
    { country: "KE", value: 34500000 }, // Kenya
    { country: "SD", value: 32600000 }, // Sudan
    { country: "ML", value: 27800000 }, // Mali
    { country: "MN", value: 27600000 }, // Mongolia
    { country: "TZ", value: 22100000 }, // Tanzania
    { country: "NE", value: 20400000 }, // Niger
    { country: "ID", value: 19400000 }, // Indonesia
    { country: "IR", value: 18300000 }, // Iran
    { country: "UG", value: 16900000 }, // Uganda
    { country: "SS", value: 16400000 }, // South Sudan
    { country: "BF", value: 16300000 }, // Burkina Faso
    { country: "NP", value: 14000000 }, // Nepal
    { country: "BR", value: 12400000 }, // Brazil
    { country: "MW", value: 11800000 }, // Malawi
    { country: "TR", value: 11600000 }, // Turkey
    { country: "SO", value: 11200000 }, // Somalia
    { country: "YE", value: 10300000 }, // Yemen
    { country: "MX", value: 8800000 }, // Mexico
    { country: "GH", value: 8700000 }, // Ghana
    { country: "AF", value: 8000000 }, // Afghanistan
    { country: "MR", value: 7400000 }, // Mauritania
    { country: "SA", value: 6800000 }, // Saudi Arabia
    { country: "CM", value: 6600000 }, // Cameroon
    { country: "SN", value: 6600000 }, // Senegal
    { country: "CF", value: 6200000 }, // Central African Republic
    { country: "MA", value: 6000000 }, // Morocco
    { country: "TG", value: 5500000 }, // Togo
    { country: "ZW", value: 5400000 }, // Zimbabwe
    { country: "ZA", value: 5100000 }, // South Africa
    { country: "DZ", value: 5100000 }, // Algeria
    { country: "TM", value: 4700000 }, // Turkmenistan
    { country: "AO", value: 4500000 }, // Angola
    { country: "ZM", value: 4500000 }, // Zambia
    { country: "MZ", value: 4400000 }, // Mozambique
    { country: "GN", value: 4200000 }, // Guinea
    { country: "AR", value: 4100000 }, // Argentina
    { country: "CD", value: 4100000 }, // DR Congo
    { country: "AU", value: 4000000 }, // Australia
    { country: "KP", value: 3900000 }, // North Korea
    { country: "PH", value: 3900000 }, // Philippines
    { country: "CI", value: 3800000 }, // Ivory Coast
    { country: "UZ", value: 3700000 }, // Uzbekistan
    { country: "BJ", value: 3600000 }, // Benin
    { country: "BI", value: 3300000 }, // Burundi
    { country: "GR", value: 3000000 }, // Greece
    { country: "VN", value: 2900000 }, // Vietnam
    { country: "AE", value: 2600000 }, // United Arab Emirates
    { country: "LY", value: 2600000 }, // Libya
    { country: "US", value: 2500000 }, // United States
    { country: "OM", value: 2500000 }, // Oman
    { country: "ES", value: 2500000 }, // Spain
    { country: "KZ", value: 2300000 }, // Kazakhstan
    { country: "BO", value: 2300000 }, // Bolivia
    { country: "MM", value: 2200000 }, // Myanmar
    { country: "TJ", value: 2100000 }, // Tajikistan
    { country: "SY", value: 2000000 }, // Syria
    { country: "ER", value: 1900000 }, // Eritrea
    { country: "HT", value: 1800000 }, // Haiti
    { country: "RU", value: 1800000 }, // Russia
    { country: "NA", value: 1800000 }, // Namibia
    { country: "PE", value: 1800000 }, // Peru
    { country: "RW", value: 1500000 }, // Rwanda
    { country: "MG", value: 1500000 }, // Madagascar
    { country: "RO", value: 1500000 }, // Romania
    { country: "IQ", value: 1400000 }, // Iraq
    { country: "VE", value: 1400000 }, // Venezuela
    { country: "FR", value: 1300000 }, // France
    { country: "TN", value: 1200000 }, // Tunisia
    { country: "BW", value: 1200000 }, // Botswana
    { country: "CO", value: 1200000 }, // Colombia
    { country: "EG", value: 1000000 }, // Egypt
    { country: "IT", value: 1000000 }, // Italy
    { country: "GW", value: 811700 }, // Guinea-Bissau
    { country: "LA", value: 753900 }, // Laos
    { country: "SL", value: 752600 }, // Sierra Leone
    { country: "JO", value: 733200 }, // Jordan
    { country: "AL", value: 721600 }, // Albania
    { country: "LS", value: 713500 }, // Lesotho
    { country: "KG", value: 685400 }, // Kyrgyzstan
    { country: "CU", value: 634500 }, // Cuba
    { country: "JM", value: 587500 }, // Jamaica
    { country: "AZ", value: 580800 }, // Azerbaijan
    { country: "NL", value: 570000 }, // Netherlands
    { country: "LB", value: 526000 }, // Lebanon
    { country: "DJ", value: 519000 }, // Djibouti
    { country: "UA", value: 487200 }, // Ukraine
    { country: "TH", value: 474100 }, // Thailand
    { country: "CL", value: 414200 }, // Chile
    { country: "GM", value: 406000 }, // Gambia
    { country: "LK", value: 365800 }, // Sri Lanka
    { country: "QA", value: 358100 }, // Qatar
    { country: "LR", value: 352500 }, // Liberia
    { country: "PT", value: 352100 }, // Portugal
    { country: "MY", value: 329700 }, // Malaysia
    { country: "CG", value: 328900 }, // Republic of the Congo
    { country: "FJ", value: 267200 }, // Fiji
    { country: "KR", value: 260400 }, // South Korea
    { country: "SZ", value: 253000 }, // Eswatini
    { country: "CY", value: 250400 }, // Cyprus
    { country: "DO", value: 227900 }, // Dominican Republic
    { country: "KW", value: 223100 }, // Kuwait
    { country: "PS", value: 222000 }, // Palestine
    { country: "TL", value: 215200 }, // Timor Leste
    { country: "RS", value: 191700 }, // Serbia
    { country: "BG", value: 184000 }, // Bulgaria
    { country: "DE", value: 159000 }, // Germany
    { country: "IL", value: 144500 }, // Israel
    { country: "MD", value: 139900 }, // Moldova
    { country: "CV", value: 139200 }, // Cape Verde
    { country: "KM", value: 121100 }, // Comoros
    { country: "GA", value: 119300 }, // Gabon
    { country: "TW", value: 116500 }, // Taiwan
    { country: "gt", value: 115800 }, // Guatemala 115.8K
    { country: "gb", value: 111000 }, // United Kingdom 111K
    { country: "py", value: 110200 }, // Paraguay 110.2K
    { country: "at", value: 99000 }, // Austria 99K
    { country: "nz", value: 88400 }, // New Zealand 88.4K
    { country: "gy", value: 83100 }, // Guyana 83.1K
    { country: "ch", value: 82300 }, // Switzerland 82.3K
    { country: "hr", value: 82000 }, // Croatia 82K
    { country: "mk", value: 80200 }, // North Macedonia 80.2K
    { country: "cr", value: 79300 }, // Costa Rica 79.3K
    { country: "no", value: 70400 }, // Norway 70.4K
    { country: "pl", value: 62600 }, // Poland 62.6K
    { country: "bt", value: 56000 }, // Bhutan 56K
    { country: "ge", value: 52500 }, // Georgia 52.5K
    { country: "by", value: 52100 }, // Belarus 52.1K
    { country: "ba", value: 44600 }, // Bosnia and Herzegovina 44.6K
    { country: "hu", value: 41000 }, // Hungary 41K
    { country: "ca", value: 30000 }, // Canada 30K
    { country: "me", value: 29100 }, // Montenegro 29.1K
    { country: "si", value: 26000 }, // Slovenia 26K
    { country: "hn", value: 24900 }, // Honduras 24.9K
    { country: "cz", value: 24600 }, // Czech Republic 24.6K
    { country: "bh", value: 24000 }, // Bahrain 24.4K
    { country: "ec", value: 23800 }, // Ecuador 23.8K
    { country: "am", value: 21900 }, // Armenia 21.9K
    { country: "ag", value: 21600 }, // Antigua and Barbuda 21.6K
    { country: "mu", value: 21600 }, // Mauritius 21.6K
    { country: "sk", value: 20500 }, // Slovakia 20.5K
    { country: "dk", value: 18300 }, // Denmark 18.3K
    { country: "uy", value: 18200 }, // Uruguay 18.2K
    { country: "jp", value: 16500 }, // Japan 16.5K
    { country: "pf", value: 16500 }, // French Polynesia 16.5K
    { country: "lc", value: 15300 }, // Saint Lucia 15.3K
    { country: "bs", value: 15200 }, // Bahamas 15.2K
    { country: "lt", value: 15000 }, // Lithuania 15K
    { country: "to", value: 14500 }, // Tonga 14.5K
    { country: "sv", value: 14200 }, // El Salvador 14.2K
    { country: "tt", value: 12200 }, // Trinidad and Tobago 12.2K
    { country: "se", value: 12000 }, // Sweden 12K
    { country: "lv", value: 11700 }, // Latvia 11.7K
    { country: "vc", value: 10400 }, // Saint Vincent and the Grenadines 10.4K
    { country: "gq", value: 10000 }, // Equatorial Guinea 10K
    { country: "dm", value: 9700 }, // Dominica 9.7K
    { country: "ie", value: 9200 }, // Ireland 9.2K
    { country: "pa", value: 9200 }, // Panama 9.2K
    { country: "kn", value: 9000 }, // Saint Kitts and Nevis 9K
    { country: "ni", value: 7900 }, // Nicaragua 7.9K
    { country: "vu", value: 6900 }, // Vanuatu 6.9K
    { country: "gd", value: 6800 }, // Grenada 6.8K
    { country: "mt", value: 6500 }, // Malta 6.5K
    { country: "fi", value: 6300 }, // Finland 6.3K
    { country: "st", value: 6000 }, // Sao Tome and Principe 6K
    { country: "sc", value: 5800 }, // Seychelles 5.8K
    { country: "bb", value: 5600 }, // Barbados 5.6K
    { country: "lu", value: 5100 }, // Luxembourg 5.1K
    { country: "fm", value: 4800 }, // Micronesia 4.8K
    { country: "bn", value: 4200 }, // Brunei 4.2K
    { country: "ee", value: 4000 }, // Estonia 4K
    { country: "sr", value: 3900 }, // Suriname 3.9K
    { country: "pr", value: 3400 }, // Puerto Rico 3.4K
    { country: "pg", value: 3100 }, // Papua New Guinea 3.1K
    { country: "is", value: 1900 }, // Iceland 1.9K
    { country: "nc", value: 1200 }, // New Caledonia 1.2K
    { country: "ck", value: 831 }, // Cook Islands 831
    { country: "sg", value: 746 }, // Singapore 746
    { country: "hk", value: 664 }, // Hong Kong 664
    { country: "bz", value: 190 }, // Belize 190
  ];

  return (
    <>
    <div className="MapContent">
      <WorldMap
        color="#50B498"
        backgroundColor="transparent"
        size="xxl"
        data={data}
      />
    </div>
    </>
  );
}

export default Map;
