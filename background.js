
// sites to prioritise when google searches
const nhs = "nhs.uk";
const patient = "patient.info";
const medlinePlus = "medlineplus.gov";
const evidence = "evidence.nhs.uk";
const britNatForm = "bnf.nice.org.uk";
const clinicSummaries = "cks.nice.org.uk";
const niceGuidance = "nice.org.uk/guidance";
const ageUk = "ageuk.org.uk";
const alzheimersSociety = "alzheimers.org.uk";
const arthritisResearch = "arthritisresearchuk.org";
const asthmaUk = "asthma.org.uk";
const breastCancerCare = "breastcancercare.org.uk";
const britDietAssoc = "bda.uk.com";
const britHeartFound = "bhf.org.uk";
const britLiverTrust = "britishlivertrust.org.uk";
const britLungFound = "blf.org.uk";
const cancerResearchUk = "cancerresearchuk.org";
const core = "corecharity.org.uk";
const crohnsColitisUk = "crohnsandcolitis.org.uk";
const diabetesUk = "crohnsandcolitis.org.uk";
const downsAssoc = "downs-syndrome.org.uk";
const epilepsyAction = "epilepsy.org.uk";
const kidneyResearchUk = "kidneyresearchuk.org";
const lymphomaAssoc = "lymphomas.org.uk";
const macmillan = "macmillan.org.uk";
const mencap = "mencap.org.uk";
const meningitis = "meningitis.org";
const mental = "mentalhealth.org.uk";
const mind = "mind.org.uk";
const miscarriage = "miscarriageassociation.org.uk";
const mndAssoc = "mndassociation.org";
const msSoc = "mssociety.org.uk";
const autismUk = "autism.org.uk";
const ndcs = "ndcs.org.uk";
const orchid = "orchid-cancer.org.uk";
const pancreatic = "pancreaticcanceraction.org";
const scope = "scope.org.uk";
const strokeAssoc = "stroke.org.uk";

const sitesArray = [nhs, patient, medlinePlus, evidence, britNatForm, clinicSummaries, niceGuidance, ageUk,
    alzheimersSociety, arthritisResearch, asthmaUk, breastCancerCare, britDietAssoc, britHeartFound, britLiverTrust,
    britLungFound, cancerResearchUk, core, crohnsColitisUk, diabetesUk, downsAssoc, epilepsyAction, kidneyResearchUk,
    lymphomaAssoc, macmillan, mencap, meningitis, mental, mind, miscarriage, mndAssoc, msSoc, autismUk, ndcs,
    orchid, pancreatic, scope, strokeAssoc];

let isDisabled = false;

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
    if(!isDisabled) {
        //make text compatible format for a url
        let result = text.replace(" ", "+");

        //create google search query url
        let url = "https://google.com/search?q=" + replace + "+" + traverseSitesArray(sitesArray);
        suggest([
            {
                content: 'text, url: ${url}}',
                description: "Curate your search via MediCurate! <url>${url}</url>"
            }
        ]);
        chrome.omnibox.setDefaultSuggestion({description: suggest[0].description});
    }
});

function traverseSitesArray(sitesArray) {
    let queryAddOn = "site%3A" + sitesArray[0];
    for(let i = 1; i < sitesArray.length; i++) {
        queryAddOn += "+OR+site%3A" + sitesArray[i];
    }
    console.log("sites traversal works");
    return queryAddOn;
}

//content script or service worker?
function monitorIsDisabled(changes, namespace) {
    if (changes.isDisabled) {
        isDisabled = changes.isDisabled.newValue;
        console.log("monitoring isDisabled works");
    }
}