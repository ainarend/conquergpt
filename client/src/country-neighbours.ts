// for (let i = 0; i<tableBody[0].children.length; i++) {const country = tableBody[0].children[i];const cName = country.children[0].querySelectorAll('i > b > a, b > a')[0].innerText; countries[cName] = [];;const neighbors = country.children[4].querySelectorAll('a'); if (neighbors.length === 0) continue; for (let j = 0; j < neighbors.length; j++) { countries[cName].push(neighbors[j].innerText);}}
// then clean up neighbours with regex search: "\[.*\]", use select all references and delete them all at once.
// also search & delete "".

export const areCountriesNeighbours = (country1: string, country2: string): boolean => {
    return countryNeighbours[country1].includes(country2);
}
const countryNeighbours: any = {
    "Abkhazia": [
        "Georgia",
        "Russia",
        "Turkey"
    ],
    "Adélie Land": [
        "Australia"
    ],
    "Afghanistan": [
        "China",
        "Iran",
        "Pakistan",
        "Tajikistan",
        "Turkmenistan",
        "Uzbekistan"
    ],
    "Akrotiri and Dhekelia": [
        "Cyprus",
    ],
    "Albania": [
        "Greece",
        "Italy",
        "Montenegro",
        "North Macedonia",
        "Kosovo",
        "some countries consider",
        "Serbia"
    ],
    "Algeria": [
        "Italy",
        "Libya",
        "Mali",
        "Mauritania",
        "Morocco",
        "Niger",
        "Spain",
        "Tunisia",
        "Western Sahara",
    ],
    "American Samoa": [
        "Samoa",
        "Tonga",
        "Cook Islands",
        "New Zealand",
        "Niue",
        "New Zealand",
        "Tokelau",
        "New Zealand"
    ],
    "Andorra": [
        "France",
        "Spain"
    ],
    "Angola": [
        "Democratic Republic of the Congo",
        "Republic of the Congo",
        "Namibia",
        "Zambia"
    ],
    "Anguilla": [
        "Antigua and Barbuda",
        "British Virgin Islands",
        "United Kingdom",
        "Netherlands",
        "Saint Barthélemy",
        "France",
        "Saint Martin",
        "France",
        "United States Virgin Islands",
        "United States"
    ],
    "Antigua and Barbuda": [
        "France",
        "Saint Kitts and Nevis",
        "Anguilla",
        "United Kingdom",
        "Montserrat",
        "United Kingdom",
        "Saint Barthélemy",
        "France"
    ],
    "Argentina": [
        "Bolivia",
        "Brazil",
        "Chile",
        "Paraguay",
        "Uruguay",
        "Falkland Islands",
        "United Kingdom"
    ],
    "Argentine Antarctica": [
        "Chilean Antarctic Territory",
        "Chile",
        "British Antarctic Territory",
        "United Kingdom"
    ],
    "Armenia": [
        "Azerbaijan",
        "Georgia",
        "Iran",
        "Turkey",
    ],
    "Republic of Artsakh": [
        "Armenia",
        "Azerbaijan",
        "Iran"
    ],
    "Aruba": [
        "Curaçao",
        "Netherlands",
        "Dominican Republic",
        "Venezuela"
    ],
    "Ashmore and Cartier Islands": [
        "Australia",
        "East Timor",
        "Indonesia"
    ],
    "Australia": [
        "East Timor",
        "Indonesia",
        "New Zealand",
        "Papua New Guinea",
        "Solomon Islands",
        "French Southern and Antarctic Lands",
        "France",
        "New Caledonia",
        "France"
    ],
    "Australia (excluding outlying islands)": [
        "Ashmore and Cartier Islands",
        "Australia",
        "Coral Sea Islands",
        "Australia",
        "East Timor",
        "Indonesia",
        "New Zealand",
        "Papua New Guinea"
    ],
    "Australian Antarctic Territory": [
        "Adélie Land",
        "France",
        "Queen Maud Land",
        "Norway",
        "Ross Dependency",
        "New Zealand"
    ],
    "Austria": [
        "Czech Republic",
        "Germany",
        "Hungary",
        "Italy",
        "Liechtenstein",
        "Slovakia",
        "Slovenia",
        "Switzerland"
    ],
    "Azerbaijan": [
        "Armenia",
        "Georgia",
        "Iran",
        "Kazakhstan",
        "Russia",
        "Turkey",
        "Turkmenistan"
    ],
    "Bahamas": [
        "Cuba",
        "Haiti",
        "United States",
        "Turks and Caicos Islands",
        "United Kingdom"
    ],
    "Bahrain": [
        "Iran",
        "Qatar",
        "Saudi Arabia"
    ],
    "Baker Island": [
        "Howland Island",
        "United States",
        "Kiribati"
    ],
    "Bangladesh": [
        "Myanmar",
        "India"
    ],
    "Barbados": [
        "France",
        "Guyana",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Trinidad and Tobago",
        "Venezuela"
    ],
    "Belarus": [
        "Latvia",
        "Lithuania",
        "Poland",
        "Russia",
        "Ukraine"
    ],
    "Belgium": [
        "France",
        "Germany",
        "Luxembourg",
        "Netherlands",
        "United Kingdom"
    ],
    "Belize": [
        "Guatemala",
        "Honduras",
        "Mexico"
    ],
    "Benin": [
        "Burkina Faso",
        "Niger",
        "Nigeria",
        "Togo"
    ],
    "Bermuda": [],
    "Bhutan": [
        "China",
        "India"
    ],
    "Bolivia": [
        "Argentina",
        "Brazil",
        "Chile",
        "Paraguay",
        "Peru"
    ],
    "Bosnia and Herzegovina": [
        "Croatia",
        "Montenegro",
        "Serbia"
    ],
    "Botswana": [
        "Namibia",
        "South Africa",
        "Zambia",
        "Zimbabwe"
    ],
    "Bouvet Island": [],
    "Brazil": [
        "Argentina",
        "Bolivia",
        "Colombia",
        "France",
        "Guyana",
        "Paraguay",
        "Peru",
        "Suriname",
        "Uruguay",
        "Venezuela"
    ],
    "British Antarctic Territory": [
        "Chilean Antarctic Territory",
        "Chile",
        "Argentine Antarctica",
        "Argentina",
        "Queen Maud Land",
        "Norway"
    ],
    "British Indian Ocean Territory": [
        "Maldives"
    ],
    "British Virgin Islands": [
        "Anguilla",
        "United Kingdom",
        "Puerto Rico",
        "United States",
        "United States Virgin Islands"
    ],
    "Brunei": [
        "China",
        "Malaysia",
        "Philippines",
        "Taiwan",
        "Vietnam",
    ],
    "Bulgaria": [
        "Greece",
        "North Macedonia",
        "Romania",
        "Serbia",
        "Turkey",
        "Russia",
        "Ukraine",
    ],
    "Burkina Faso": [
        "Benin",
        "Côte d'Ivoire",
        "Ghana",
        "Mali",
        "Niger",
        "Togo"
    ],
    "Burundi": [
        "Democratic Republic of the Congo",
        "Rwanda",
        "Tanzania"
    ],
    "Cambodia": [
        "Laos",
        "Thailand",
        "Vietnam",
    ],
    "Cameroon": [
        "Central African Republic",
        "Chad",
        "Republic of the Congo",
        "Equatorial Guinea",
        "Gabon",
        "Nigeria"
    ],
    "Canada": [
        "United States",
        "Greenland",
        "Denmark",
        "Saint Pierre and Miquelon",
        "France"
    ],
    "Cape Verde": [
        "The Gambia",
        "Mauritania",
        "Senegal"
    ],
    "Cayman Islands": [
        "Cuba",
        "Honduras",
        "Jamaica"
    ],
    "Central African Republic": [
        "Cameroon",
        "Chad",
        "Democratic Republic of the Congo",
        "Republic of the Congo",
        "South Sudan",
        "Sudan"
    ],
    "Chad": [
        "Cameroon",
        "Central African Republic",
        "Libya",
        "Niger",
        "Nigeria",
        "Sudan"
    ],
    "Chile": [
        "Argentina",
        "Bolivia",
        "Peru"
    ],
    "Chilean Antarctic Territory": [
        "Argentine Antarctica",
        "Argentina",
        "British Antarctic Territory",
        "United Kingdom",
        "Peter I Island",
        "Norway"
    ],
    "People's Republic of China": [
        "Afghanistan",
        "Bhutan",
        "Brunei",
        "India",
        "Indonesia",
        "Japan",
        "Kazakhstan",
        "North Korea",
        "South Korea",
        "Kyrgyzstan",
        "Laos",
        "Malaysia",
        "Mongolia",
        "Myanmar",
        "Nepal",
        "Pakistan",
        "Philippines",
        "Russia",
        "Tajikistan",
        "Vietnam",
        "Hong Kong",
        "Macau",
        "Taiwan"
    ],
    "Christmas Island": [
        "Indonesia"
    ],
    "Clipperton Island": [],
    "Cocos (Keeling) Islands": [],
    "Colombia": [
        "Brazil",
        "Costa Rica",
        "Dominican Republic",
        "Ecuador",
        "Haiti",
        "Jamaica",
        "Nicaragua",
        "Panama",
        "Peru",
        "Venezuela"
    ],
    "Comoros": [
        "France",
        "Madagascar",
        "Mozambique",
        "Seychelles",
        "Tanzania",
        "French Southern and Antarctic Lands",
        "France"
    ],
    "Democratic Republic of the Congo": [
        "Angola",
        "Burundi",
        "Central African Republic",
        "Republic of the Congo",
        "Rwanda",
        "South Sudan",
        "Tanzania",
        "Uganda",
        "Zambia"
    ],
    "Republic of the Congo": [
        "Angola",
        "Cameroon",
        "Central African Republic",
        "Democratic Republic of the Congo",
        "Gabon"
    ],
    "Cook Islands": [
        "Kiribati",
        "American Samoa",
        "United States",
        "French Polynesia",
        "France",
        "Niue",
        "New Zealand",
        "Tokelau",
        "New Zealand"
    ],
    "Coral Sea Islands": [
        "Australia",
        "New Caledonia",
        "France",
        "Papua New Guinea",
        "Solomon Islands"
    ],
    "Costa Rica": [
        "Colombia",
        "Ecuador",
        "Nicaragua",
        "Panama"
    ],
    "Côte d'Ivoire": [
        "Burkina Faso",
        "Ghana",
        "Guinea",
        "Liberia",
        "Mali"
    ],
    "Croatia": [
        "Bosnia and Herzegovina",
        "Hungary",
        "Italy",
        "Montenegro",
        "Serbia",
        "Slovenia"
    ],
    "Cuba": [
        "Bahamas",
        "Haiti",
        "Honduras",
        "Jamaica",
        "Mexico",
        "United States",
        "Cayman Islands",
        "United Kingdom",
        "Navassa Island",
        "United States"
    ],
    "Curaçao": [
        "Dominican Republic",
        "Netherlands",
        "Venezuela",
        "Aruba",
        "Netherlands"
    ],
    "Cyprus": [
        "Northern Cyprus",
        "Egypt",
        "Greece",
        "Israel",
        "Lebanon",
        "Syria",
        "Turkey",
        "Akrotiri and Dhekelia",
        "United Kingdom",
        "United Nations Buffer Zone in Cyprus"
    ],
    "Northern Cyprus": [
        "Cyprus",
        "Syria",
        "Turkey",
        "Akrotiri and Dhekelia",
        "United Kingdom",
        "United Nations Buffer Zone in Cyprus"
    ],
    "Czech Republic": [
        "Austria",
        "Germany",
        "Poland",
        "Slovakia"
    ],
    "Denmark": [
        "Germany",
        "Norway",
        "Poland",
        "Sweden",
        "United Kingdom"
    ],
    "Denmark, Kingdom of": [
        "Canada",
        "Germany",
        "Iceland",
        "Norway",
        "Poland",
        "Sweden",
        "United Kingdom",
        "Jan Mayen",
        "Norway",
        "Svalbard",
        "Norway"
    ],
    "Djibouti": [
        "Eritrea",
        "Ethiopia",
        "Somalia",
        "Yemen"
    ],
    "Dominica": [
        "France",
        "Venezuela"
    ],
    "Dominican Republic": [
        "Colombia",
        "Haiti",
        "Venezuela",
        "Aruba",
        "Netherlands",
        "Curaçao",
        "Netherlands",
        "Puerto Rico",
        "United States",
        "Turks and Caicos Islands",
        "United Kingdom"
    ],
    "East Timor": [
        "Australia",
        "Indonesia",
        "Ashmore and Cartier Islands",
        "Australia"
    ],
    "Ecuador": [
        "Colombia",
        "Costa Rica",
        "Peru"
    ],
    "Egypt": [
        "Cyprus",
        "Greece",
        "Israel",
        "Jordan",
        "Libya",
        "Saudi Arabia",
        "Sudan",
        "Turkey",
        "Palestine",
    ],
    "El Salvador": [
        "Guatemala",
        "Honduras",
        "Nicaragua"
    ],
    "Equatorial Guinea": [
        "Cameroon",
        "Gabon",
        "Nigeria",
        "São Tomé and Príncipe"
    ],
    "Eritrea": [
        "Djibouti",
        "Saudi Arabia",
        "Sudan",
        "Ethiopia",
        "Yemen"
    ],
    "Estonia": [
        "Finland",
        "Latvia",
        "Russia",
        "Sweden"
    ],
    "Eswatini (Swaziland)": [
        "Mozambique",
        "South Africa"
    ],
    "Ethiopia": [
        "Djibouti",
        "Eritrea",
        "Kenya",
        "Somalia",
        "South Sudan",
        "Sudan"
    ],
    "Falkland Islands": [
        "Argentina"
    ],
    "Faroe Islands": [
        "Iceland",
        "Norway",
        "United Kingdom"
    ],
    "Fiji": [
        "New Zealand",
        "Solomon Islands",
        "Tonga",
        "Tuvalu",
        "Vanuatu",
        "New Caledonia",
        "France",
        "Wallis and Futuna",
        "France"
    ],
    "Finland": [
        "Estonia",
        "Norway",
        "Russia",
        "Sweden"
    ],
    "France": [
        "Andorra",
        "Antigua and Barbuda",
        "Barbados",
        "Belgium",
        "Brazil",
        "Canada",
        "Comoros",
        "Dominica",
        "Fiji",
        "Germany",
        "Italy",
        "Kiribati",
        "Luxembourg",
        "Madagascar",
        "Mauritius",
        "Monaco",
        "Mozambique",
        "Netherlands",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Samoa",
        "Seychelles",
        "Solomon Islands",
        "Spain",
        "Suriname",
        "Switzerland",
        "Tonga",
        "Tuvalu",
        "United Kingdom",
        "Vanuatu",
        "Venezuela",
        "Anguilla",
        "United Kingdom",
        "Cook Islands",
        "New Zealand",
        "Coral Sea Islands",
        "Australia",
        "Guernsey",
        "United Kingdom",
        "Heard Island and McDonald Islands",
        "Australia",
        "Jersey",
        "United Kingdom",
        "Montserrat",
        "United Kingdom",
        "Sint Maarten",
        "Netherlands",
        "Norfolk Island",
        "Australia",
        "Pitcairn Islands",
        "United Kingdom",
        "Tokelau",
        "New Zealand"
    ],
    "French Polynesia": [
        "Kiribati",
        "Cook Islands",
        "New Zealand",
        "Pitcairn Islands",
        "United Kingdom"
    ],
    "French Southern and Antarctic Lands": [
        "Comoros",
        "France",
        "Madagascar",
        "Mauritius",
        "Mozambique",
        "Seychelles",
        "Heard Island and McDonald Islands",
        "Australia"
    ],
    "Gabon": [
        "Cameroon",
        "Republic of the Congo",
        "Equatorial Guinea",
        "São Tomé and Príncipe"
    ],
    "The Gambia": [
        "Cape Verde",
        "Senegal"
    ],
    "Georgia": [
        "Armenia",
        "Azerbaijan",
        "Russia",
        "Turkey"
    ],
    "Germany": [
        "Austria",
        "Belgium",
        "Czech Republic",
        "Denmark",
        "France",
        "Luxembourg",
        "Netherlands",
        "Poland",
        "Sweden",
        "Switzerland",
        "United Kingdom"
    ],
    "Ghana": [
        "Burkina Faso",
        "Côte d'Ivoire",
        "Togo"
    ],
    "Gibraltar": [
        "Spain"
    ],
    "Greece": [
        "Albania",
        "Bulgaria",
        "Cyprus",
        "Egypt",
        "Italy",
        "Libya",
        "North Macedonia",
        "Turkey"
    ],
    "Greenland": [
        "Canada",
        "Iceland",
        "Jan Mayen",
        "Norway",
        "Svalbard",
        "Norway"
    ],
    "Grenada": [
        "Saint Vincent and the Grenadines",
        "Trinidad and Tobago",
        "Venezuela"
    ],
    "Guam": [
        "Federated States of Micronesia",
        "Northern Mariana Islands",
        "United States"
    ],
    "Guatemala": [
        "Belize",
        "El Salvador",
        "Honduras",
        "Mexico"
    ],
    "Guernsey": [
        "France",
        "United Kingdom",
        "Jersey",
        "United Kingdom"
    ],
    "Guinea": [
        "Côte d'Ivoire",
        "Guinea-Bissau",
        "Liberia",
        "Mali",
        "Senegal",
        "Sierra Leone"
    ],
    "Guinea-Bissau": [
        "Guinea",
        "Senegal"
    ],
    "Guyana": [
        "Barbados",
        "Brazil",
        "Suriname",
        "Trinidad and Tobago",
        "Venezuela",
    ],
    "Haiti": [
        "Bahamas",
        "Colombia",
        "Cuba",
        "Dominican Republic",
        "Jamaica",
        "Navassa Island",
        "United States",
        "Haiti",
        "Turks and Caicos Islands",
        "United Kingdom"
    ],
    "Heard Island and McDonald Islands": [
        "French Southern and Antarctic Lands",
        "France"
    ],
    "Honduras": [
        "Belize",
        "Cuba",
        "El Salvador",
        "Guatemala",
        "Jamaica",
        "Mexico",
        "Nicaragua",
        "Cayman Islands",
        "United Kingdom"
    ],
    "Hong Kong": [
        "China",
        "Macau"
    ],
    "Howland Island": [
        "Baker Island",
        "United States"
    ],
    "Hungary": [
        "Austria",
        "Croatia",
        "Romania",
        "Serbia",
        "Slovakia",
        "Slovenia",
        "Ukraine"
    ],
    "Iceland": [
        "Faroe Islands",
        "Denmark",
        "Greenland",
        "Denmark",
        "Jan Mayen",
        "Norway"
    ],
    "India": [
        "Bangladesh",
        "Bhutan",
        "Myanmar",
        "China",
        "Indonesia",
        "Maldives",
        "Nepal",
        "Pakistan",
        "Sri Lanka",
        "Thailand"
    ],
    "Indonesia": [
        "Australia",
        "China",
        "East Timor",
        "India",
        "Malaysia",
        "Palau",
        "Papua New Guinea",
        "Philippines",
        "Singapore",
        "Taiwan",
        "Thailand",
        "Vietnam",
        "Ashmore and Cartier Islands",
        "Australia",
        "Christmas Island",
        "Australia"
    ],
    "Iran": [
        "Afghanistan",
        "Armenia",
        "Azerbaijan",
        "Bahrain",
        "Iraq",
        "Kuwait",
        "Oman",
        "Pakistan",
        "Qatar",
        "Saudi Arabia",
        "Turkey",
        "Turkmenistan",
        "United Arab Emirates"
    ],
    "Iraq": [
        "Iran",
        "Jordan",
        "Kuwait",
        "Saudi Arabia",
        "Syria",
        "Turkey"
    ],
    "Ireland": [
        "United Kingdom"
    ],
    "Isle of Man": [
        "United Kingdom"
    ],
    "Israel": [
        "Cyprus",
        "Egypt",
        "Jordan",
        "Lebanon",
        "Syria",
        "Palestine",
    ],
    "Italy": [
        "Albania",
        "Algeria",
        "Austria",
        "Croatia",
        "France",
        "Greece",
        "Libya",
        "Malta",
        "Montenegro",
        "San Marino",
        "Slovenia",
        "Spain",
        "Switzerland",
        "Tunisia",
        "Vatican City"
    ],
    "Jamaica": [
        "Colombia",
        "Cuba",
        "Haiti",
        "Honduras",
        "Nicaragua",
        "Cayman Islands",
        "United Kingdom",
        "Navassa Island",
        "United States",
        "Haiti"
    ],
    "Jan Mayen": [
        "Iceland",
        "Greenland",
        "Denmark"
    ],
    "Japan": [
        "China",
        "South Korea",
        "North Korea",
        "Philippines",
        "Russia",
        "Northern Mariana Islands",
        "United States",
        "Taiwan"
    ],
    "Jarvis Island": [
        "Kiribati"
    ],
    "Jersey": [
        "France",
        "Guernsey",
        "United Kingdom"
    ],
    "Johnston Atoll": [],
    "Jordan": [
        "Egypt",
        "Iraq",
        "Israel",
        "Saudi Arabia",
        "Syria",
        "Palestine"
    ],
    "Kazakhstan": [
        "Azerbaijan",
        "China",
        "Kyrgyzstan",
        "Russia",
        "Turkmenistan",
        "Uzbekistan"
    ],
    "Kenya": [
        "Ethiopia",
        "Somalia",
        "South Sudan",
        "Tanzania",
        "Uganda"
    ],
    "Kingman Reef": [
        "Kiribati",
        "Palmyra Atoll",
        "United States"
    ],
    "Kiribati": [
        "Marshall Islands",
        "Nauru",
        "Tuvalu",
        "Cook Islands",
        "New Zealand",
        "French Polynesia",
        "France",
        "Baker Island",
        "United States",
        "Jarvis Island",
        "United States",
        "Kingman Reef",
        "United States",
        "Palmyra Atoll",
        "United States",
        "Tokelau",
        "New Zealand"
    ],
    "North Korea": [
        "China",
        "South Korea",
        "Russia",
        "Japan"
    ],
    "South Korea": [
        "China",
        "Japan",
        "North Korea"
    ],
    "Kosovo": [
        "Albania",
        "Montenegro",
        "North Macedonia",
        "Serbia"
    ],
    "Kuwait": [
        "Iran",
        "Iraq",
        "Saudi Arabia"
    ],
    "Kyrgyzstan": [
        "China",
        "Kazakhstan",
        "Tajikistan",
        "Uzbekistan"
    ],
    "Laos": [
        "Myanmar",
        "Cambodia",
        "China",
        "Thailand",
        "Vietnam"
    ],
    "Latvia": [
        "Belarus",
        "Estonia",
        "Lithuania",
        "Russia",
        "Sweden"
    ],
    "Lebanon": [
        "Cyprus",
        "Israel",
        "Syria"
    ],
    "Lesotho": [
        "South Africa"
    ],
    "Liberia": [
        "Côte d'Ivoire",
        "Guinea",
        "Sierra Leone"
    ],
    "Libya": [
        "Algeria",
        "Chad",
        "Egypt",
        "Greece",
        "Italy",
        "Malta",
        "Niger",
        "Sudan",
        "Tunisia",
        "Turkey"
    ],
    "Liechtenstein": [
        "Austria",
        "Switzerland"
    ],
    "Lithuania": [
        "Belarus",
        "Latvia",
        "Poland",
        "Russia",
        "Sweden"
    ],
    "Luxembourg": [
        "Belgium",
        "France",
        "Germany"
    ],
    "Macau": [
        "China",
        "Hong Kong"
    ],
    "Madagascar": [
        "Comoros",
        "France",
        "Mauritius",
        "Mozambique",
        "Seychelles",
        "French Southern and Antarctic Lands",
        "France"
    ],
    "Malawi": [
        "Mozambique",
        "Tanzania",
        "Zambia"
    ],
    "Malaysia": [
        "Brunei",
        "China",
        "Indonesia",
        "Philippines",
        "Singapore",
        "Thailand",
        "Vietnam",
        "Taiwan"
    ],
    "Maldives": [
        "India",
        "Sri Lanka",
        "British Indian Ocean Territory",
        "United Kingdom",
        "Mauritius"
    ],
    "Mali": [
        "Algeria",
        "Burkina Faso",
        "Côte d'Ivoire",
        "Guinea",
        "Mauritania",
        "Niger",
        "Senegal"
    ],
    "Malta": [
        "Italy",
        "Libya"
    ],
    "Marshall Islands": [
        "Kiribati",
        "Federated States of Micronesia",
        "Nauru",
        "Wake Island",
        "United States"
    ],
    "Mauritania": [
        "Algeria",
        "Cape Verde",
        "Mali",
        "Senegal",
        "Western Sahara",
        "Western Sahara",
        "Morocco"
    ],
    "Mauritius": [
        "France",
        "Madagascar",
        "Seychelles",
        "French Southern and Antarctic Lands",
        "France",
        "Maldives"
    ],
    "Mexico": [
        "Belize",
        "Cuba",
        "Guatemala",
        "Honduras",
        "United States"
    ],
    "Federated States of Micronesia": [
        "Marshall Islands",
        "Palau",
        "Papua New Guinea",
        "Guam",
        "United States"
    ],
    "Midway Atoll": [
        "United States"
    ],
    "Moldova": [
        "Romania",
        "Ukraine"
    ],
    "Monaco": [
        "France"
    ],
    "Mongolia": [
        "China",
        "Russia"
    ],
    "Montenegro": [
        "Albania",
        "Bosnia and Herzegovina",
        "Croatia",
        "Italy",
        "Serbia",
        "Kosovo"
    ],
    "Montserrat": [
        "Antigua and Barbuda",
        "France",
        "Saint Kitts and Nevis",
        "Venezuela"
    ],
    "Morocco": [
        "Algeria",
        "Portugal",
        "Spain",
        "Western Sahara"
    ],
    "Mozambique": [
        "Comoros",
        "Eswatini (Swaziland)",
        "Madagascar",
        "Malawi",
        "South Africa",
        "Tanzania",
        "Zambia",
        "Zimbabwe",
        "French Southern and Antarctic Lands",
        "France"
    ],
    "Myanmar": [
        "Bangladesh",
        "China",
        "India",
        "Laos",
        "Thailand"
    ],
    "Namibia": [
        "Angola",
        "Botswana",
        "South Africa",
        "Zambia"
    ],
    "Nauru": [
        "Kiribati",
        "Marshall Islands"
    ],
    "Navassa Island": [
        "Cuba",
        "Haiti",
        "Jamaica"
    ],
    "Nepal": [
        "India",
        "China"
    ],
    "Netherlands": [
        "Belgium",
        "Germany",
        "Saint Kitts and Nevis",
        "United Kingdom",
        "Venezuela",
        "Anguilla",
        "United Kingdom",
        "Curaçao",
        "Netherlands",
        "Saint Barthélemy",
        "France",
        "Saint Martin",
        "France",
        "Sint Maarten",
        "Netherlands",
        "United States Virgin Islands",
        "United States"
    ],
    "Netherlands, Kingdom of the": [
        "Belgium",
        "Dominican Republic",
        "Germany",
        "Saint Kitts and Nevis",
        "United Kingdom",
        "Venezuela",
        "Anguilla",
        "United Kingdom",
        "Saint Barthélemy",
        "France",
        "Saint Martin",
        "France",
        "United States Virgin Islands",
        "United States"
    ],
    "New Caledonia": [
        "Fiji",
        "Solomon Islands",
        "Vanuatu",
        "Coral Sea Islands",
        "Australia",
        "Norfolk Island",
        "Australia"
    ],
    "New Zealand": [
        "Australia",
        "Fiji",
        "Norfolk Island",
        "Australia"
    ],
    "New Zealand, Realm of": [
        "Australia",
        "Fiji",
        "Kiribati",
        "Samoa",
        "Tonga",
        "American Samoa",
        "United States",
        "French Polynesia",
        "France",
        "Norfolk Island",
        "Australia",
        "Wallis and Futuna",
        "France"
    ],
    "Nicaragua": [
        "Colombia",
        "Costa Rica",
        "El Salvador",
        "Honduras",
        "Jamaica",
        "Panama"
    ],
    "Niger": [
        "Algeria",
        "Benin",
        "Burkina Faso",
        "Chad",
        "Libya",
        "Mali",
        "Nigeria"
    ],
    "Nigeria": [
        "Benin",
        "Cameroon",
        "Chad",
        "Equatorial Guinea",
        "Niger",
        "São Tomé and Príncipe"
    ],
    "Niue": [
        "Tonga",
        "American Samoa",
        "United States",
        "Cook Islands",
        "New Zealand"
    ],
    "Norfolk Island": [
        "New Zealand",
        "New Caledonia",
        "France"
    ],
    "North Macedonia": [
        "Albania",
        "Bulgaria",
        "Greece",
        "Serbia",
        "Kosovo",
        "[i]"
    ],
    "Northern Mariana Islands": [
        "Japan",
        "Guam",
        "United States"
    ],
    "Norway": [
        "Denmark",
        "Finland",
        "Russia",
        "Sweden",
        "United Kingdom",
        "Faroe Islands",
        "Denmark",
        "Svalbard",
        "Norway"
    ],
    "Norway, Kingdom of (plus dependent Norwegian territories)": [
        "Denmark",
        "Finland",
        "Iceland",
        "Russia",
        "Sweden",
        "United Kingdom",
        "Faroe Islands",
        "Denmark",
        "Greenland",
        "Denmark"
    ],
    "Oman": [
        "Iran",
        "Pakistan",
        "Saudi Arabia",
        "United Arab Emirates",
        "Yemen"
    ],
    "Pakistan": [
        "Afghanistan",
        "China",
        "India",
        "Iran",
        "Oman"
    ],
    "Palau": [
        "Indonesia",
        "Federated States of Micronesia",
        "Philippines"
    ],
    "Palestine": [
        "Egypt",
        "Israel",
        "Jordan"
    ],
    "Palmyra Atoll": [
        "Kiribati",
        "Kingman Reef",
        "United States"
    ],
    "Panama": [
        "Colombia",
        "Costa Rica",
        "Nicaragua"
    ],
    "Papua New Guinea": [
        "Australia",
        "Indonesia",
        "Federated States of Micronesia",
        "Solomon Islands",
        "Coral Sea Islands",
        "Australia"
    ],
    "Paraguay": [
        "Argentina",
        "Bolivia",
        "Brazil"
    ],
    "Peru": [
        "Bolivia",
        "Brazil",
        "Chile",
        "Colombia",
        "Ecuador"
    ],
    "Peter I Island": [
        "Chilean Antarctic Territory",
        "Chile"
    ],
    "Philippines": [
        "Brunei",
        "China",
        "Indonesia",
        "Japan",
        "Malaysia",
        "Palau",
        "Vietnam",
        "Taiwan",
        "[q]"
    ],
    "Pitcairn Islands": [
        "French Polynesia",
        "France"
    ],
    "Poland": [
        "Belarus",
        "Czech Republic",
        "Denmark",
        "Germany",
        "Lithuania",
        "Russia",
        "Slovakia",
        "Sweden",
        "Ukraine"
    ],
    "Portugal": [
        "Morocco",
        "Spain"
    ],
    "Puerto Rico": [
        "Dominican Republic",
        "Venezuela",
        "British Virgin Islands",
        "United Kingdom",
        "United States Virgin Islands",
        "United States"
    ],
    "Qatar": [
        "Bahrain",
        "Iran",
        "Saudi Arabia",
        "United Arab Emirates"
    ],
    "Queen Maud Land": [
        "Australian Antarctic Territory",
        "Australia",
        "British Antarctic Territory",
        "United Kingdom"
    ],
    "Romania": [
        "Bulgaria",
        "Hungary",
        "Moldova",
        "Russia",
        "Serbia",
        "Ukraine"
    ],
    "Ross Dependency": [
        "Australian Antarctic Territory",
        "Australia"
    ],
    "Russia": [
        "Azerbaijan",
        "Belarus",
        "Bulgaria",
        "China",
        "Estonia",
        "Finland",
        "Georgia",
        "Japan",
        "Kazakhstan",
        "North Korea",
        "Latvia",
        "Lithuania",
        "Mongolia",
        "Norway",
        "Poland",
        "Romania",
        "Sweden",
        "Turkey",
        "Ukraine",
        "United States",
        "Svalbard",
        "Norway"
    ],
    "Rwanda": [
        "Burundi",
        "Democratic Republic of the Congo",
        "Tanzania",
        "Uganda"
    ],
    "Saint Barthélemy": [
        "Antigua and Barbuda",
        "Netherlands",
        "Saint Kitts and Nevis",
        "Anguilla",
        "United Kingdom",
        "Saint Martin",
        "France",
        "Sint Maarten",
        "Netherlands"
    ],
    "Saint Helena, Ascension and Tristan da Cunha": [],
    "Saint Kitts and Nevis": [
        "Antigua and Barbuda",
        "Netherlands",
        "Venezuela",
        "Montserrat",
        "United Kingdom",
        "Saint Barthélemy",
        "France"
    ],
    "Saint Lucia": [
        "Barbados",
        "France",
        "Saint Vincent and the Grenadines",
        "Venezuela"
    ],
    "Saint Martin": [
        "Netherlands",
        "Anguilla",
        "United Kingdom",
        "Saint Barthélemy",
        "France",
        "Sint Maarten",
        "Netherlands"
    ],
    "Saint Pierre and Miquelon": [
        "Canada"
    ],
    "Saint Vincent and the Grenadines": [
        "Barbados",
        "Grenada",
        "Saint Lucia",
        "Trinidad and Tobago",
        "Venezuela"
    ],
    "Samoa": [
        "Tonga",
        "American Samoa",
        "United States",
        "Tokelau",
        "New Zealand",
        "Wallis and Futuna",
        "France"
    ],
    "San Marino": [
        "Italy"
    ],
    "São Tomé and Príncipe": [
        "Equatorial Guinea",
        "Gabon",
        "Nigeria"
    ],
    "Saudi Arabia": [
        "Bahrain",
        "Egypt",
        "Eritrea",
        "Iran",
        "Iraq",
        "Jordan",
        "Kuwait",
        "Oman",
        "Qatar",
        "Sudan",
        "United Arab Emirates",
        "Yemen"
    ],
    "Senegal": [
        "Cape Verde",
        "The Gambia",
        "Guinea",
        "Guinea-Bissau",
        "Mali",
        "Mauritania"
    ],
    "Serbia": [
        "Bosnia and Herzegovina",
        "Bulgaria",
        "Croatia",
        "Hungary",
        "Montenegro",
        "North Macedonia",
        "Romania",
        "Kosovo",
        "some countries consider",
        "Albania"
    ],
    "Seychelles": [
        "Comoros",
        "Madagascar",
        "Mauritius",
        "Tanzania",
        "French Southern and Antarctic Lands",
        "France"
    ],
    "Sierra Leone": [
        "Guinea",
        "Liberia"
    ],
    "Singapore": [
        "Indonesia",
        "Malaysia"
    ],
    "Sint Maarten": [
        "Netherlands",
        "Saint Barthélemy",
        "France",
        "Saint Martin",
        "France"
    ],
    "Slovakia": [
        "Austria",
        "Czech Republic",
        "Hungary",
        "Poland",
        "Ukraine"
    ],
    "Slovenia": [
        "Austria",
        "Croatia",
        "Italy",
        "Hungary"
    ],
    "Solomon Islands": [
        "Fiji",
        "Papua New Guinea",
        "Vanuatu",
        "Coral Sea Islands",
        "Australia",
        "New Caledonia",
        "France"
    ],
    "Somalia": [
        "Djibouti",
        "Ethiopia",
        "Kenya",
        "Yemen"
    ],
    "Somaliland": [
        "Djibouti",
        "Ethiopia",
        "Somalia",
        "Yemen"
    ],
    "South Africa": [
        "Botswana",
        "Eswatini (Swaziland)",
        "Lesotho",
        "Mozambique",
        "Namibia",
        "Zimbabwe"
    ],
    "South Georgia and the South Sandwich Islands": [],
    "South Ossetia": [
        "Georgia",
        "Russia"
    ],
    "South Sudan": [
        "Central African Republic",
        "Democratic Republic of the Congo",
        "Ethiopia",
        "Kenya",
        "Sudan",
        "Uganda"
    ],
    "Spain": [
        "Algeria",
        "Andorra",
        "France",
        "Italy",
        "Morocco",
        "Portugal",
        "Gibraltar",
        "United Kingdom",
        "Western Sahara",
        "[j]"
    ],
    "Sri Lanka": [
        "India",
        "Maldives"
    ],
    "Sudan": [
        "Central African Republic",
        "Chad",
        "Egypt",
        "Eritrea",
        "Ethiopia",
        "Libya",
        "Saudi Arabia",
        "South Sudan"
    ],
    "Suriname": [
        "Brazil",
        "France",
        "Guyana"
    ],
    "Svalbard": [
        "Norway",
        "Russia",
        "Greenland",
        "Denmark"
    ],
    "Sweden": [
        "Denmark",
        "Estonia",
        "Finland",
        "Germany",
        "Latvia",
        "Lithuania",
        "Norway",
        "Poland",
        "Russia"
    ],
    "Switzerland": [
        "Austria",
        "France",
        "Italy",
        "Liechtenstein",
        "Germany"
    ],
    "Syria": [
        "Cyprus",
        "Iraq",
        "Israel",
        "Jordan",
        "Lebanon",
        "Turkey",
        "Northern Cyprus"
    ],
    "Republic of China": [
        "Brunei",
        "China",
        "Indonesia",
        "Japan",
        "Malaysia",
        "Philippines",
        "Vietnam",
        "[q]"
    ],
    "Tajikistan": [
        "Afghanistan",
        "China",
        "Kyrgyzstan",
        "Uzbekistan"
    ],
    "Tanzania": [
        "Burundi",
        "Comoros",
        "Democratic Republic of the Congo",
        "Kenya",
        "Malawi",
        "Mozambique",
        "Rwanda",
        "Seychelles",
        "Uganda",
        "Zambia"
    ],
    "Thailand": [
        "Myanmar",
        "Cambodia",
        "India",
        "Indonesia",
        "Laos",
        "Malaysia",
        "Vietnam",
        "[q]"
    ],
    "Togo": [
        "Benin",
        "Burkina Faso",
        "Ghana"
    ],
    "Tokelau": [
        "Kiribati",
        "Samoa",
        "American Samoa",
        "United States",
        "Cook Islands",
        "New Zealand",
        "Wallis and Futuna",
        "France"
    ],
    "Tonga": [
        "Fiji",
        "Samoa",
        "American Samoa",
        "United States",
        "Niue",
        "New Zealand",
        "Wallis and Futuna",
        "France"
    ],
    "Transnistria": [
        "Moldova",
        "Ukraine"
    ],
    "Trinidad and Tobago": [
        "Barbados",
        "Grenada",
        "Guyana",
        "Saint Vincent and the Grenadines",
        "Venezuela"
    ],
    "Tunisia": [
        "Algeria",
        "Italy",
        "Libya"
    ],
    "Turkey": [
        "Armenia",
        "Azerbaijan",
        "Bulgaria",
        "Cyprus",
        "Egypt",
        "Georgia",
        "Greece",
        "Iran",
        "Iraq",
        "Russia",
        "Syria",
        "Ukraine",
        "Northern Cyprus"
    ],
    "Turkmenistan": [
        "Afghanistan",
        "Azerbaijan",
        "Iran",
        "Kazakhstan",
        "Uzbekistan"
    ],
    "Turks and Caicos Islands": [
        "Bahamas",
        "Dominican Republic",
        "Haiti"
    ],
    "Tuvalu": [
        "Fiji",
        "Kiribati",
        "Wallis and Futuna",
        "France"
    ],
    "Uganda": [
        "Democratic Republic of the Congo",
        "Kenya",
        "Rwanda",
        "South Sudan",
        "Tanzania"
    ],
    "Ukraine": [
        "Belarus",
        "Bulgaria",
        "Hungary",
        "Moldova",
        "Poland",
        "Romania",
        "Russia",
        "Slovakia",
        "Turkey"
    ],
    "United Arab Emirates": [
        "Iran",
        "Oman",
        "Qatar",
        "Saudi Arabia"
    ],
    "United Kingdom": [
        "Antigua and Barbuda",
        "Argentina",
        "Bahamas",
        "Belgium",
        "Cuba",
        "Cyprus",
        "Denmark",
        "Dominican Republic",
        "France",
        "Germany",
        "Haiti",
        "Honduras",
        "Ireland",
        "Jamaica",
        "Maldives",
        "Netherlands",
        "Norway",
        "Saint Kitts and Nevis",
        "Spain",
        "Venezuela",
        "Faroe Islands",
        "Denmark",
        "French Polynesia",
        "Puerto Rico",
        "United States",
        "Saint Barthélemy",
        "France",
        "Saint Martin",
        "France",
        "United States Virgin Islands",
        "United States"
    ],
    "United States": [
        "Bahamas",
        "Canada",
        "Cuba",
        "Dominican Republic",
        "Haiti",
        "Jamaica",
        "Japan",
        "Kiribati",
        "Marshall Islands",
        "Mexico",
        "Federated States of Micronesia",
        "Netherlands",
        "Russia",
        "Samoa",
        "Tonga",
        "Venezuela",
        "Anguilla",
        "United Kingdom",
        "British Virgin Islands",
        "United Kingdom",
        "Cook Islands",
        "New Zealand",
        "Niue",
        "New Zealand",
        "Tokelau",
        "New Zealand"
    ],
    "United States Virgin Islands": [
        "Netherlands",
        "Venezuela",
        "Anguilla",
        "United Kingdom",
        "British Virgin Islands",
        "United Kingdom",
        "Puerto Rico",
        "United States"
    ],
    "Uruguay": [
        "Argentina",
        "Brazil"
    ],
    "Uzbekistan": [
        "Afghanistan",
        "Kazakhstan",
        "Kyrgyzstan",
        "Tajikistan",
        "Turkmenistan"
    ],
    "Vanuatu": [
        "Fiji",
        "Solomon Islands",
        "New Caledonia",
        "France"
    ],
    "Vatican City": [
        "Italy"
    ],
    "Venezuela": [
        "Barbados",
        "Brazil",
        "Colombia",
        "Dominica",
        "Dominican Republic",
        "France",
        "Grenada",
        "Guyana",
        "Netherlands",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Trinidad and Tobago",
        "Aruba",
        "Netherlands",
        "Curaçao",
        "Netherlands",
        "Montserrat",
        "United Kingdom",
        "Puerto Rico",
        "United States",
        "United States Virgin Islands",
        "United States"
    ],
    "Vietnam": [
        "Brunei",
        "Cambodia",
        "China",
        "Indonesia",
        "Laos",
        "Malaysia",
        "Philippines",
        "Taiwan",
        "Thailand",
        "[q]"
    ],
    "Wake Island": [
        "Marshall Islands"
    ],
    "Wallis and Futuna": [
        "Fiji",
        "Samoa",
        "Tonga",
        "Tuvalu",
        "Tokelau",
        "New Zealand"
    ],
    "Western Sahara": [
        "Algeria",
        "Mauritania",
        "Morocco",
        "Spain"
    ],
    "Yemen": [
        "Djibouti",
        "Eritrea",
        "Oman",
        "Saudi Arabia",
        "Somalia"
    ],
    "Zambia": [
        "Angola",
        "Botswana",
        "Democratic Republic of the Congo",
        "Malawi",
        "Mozambique",
        "Namibia",
        "Tanzania",
        "Zimbabwe"
    ],
    "Zimbabwe": [
        "Botswana",
        "Mozambique",
        "South Africa",
        "Zambia"
    ]
}