//http://www.jstor.org/action/showPublication?journalCode=jhighereducation
//https://ohiostatepress.org/index.htm?journals/jhe/jhemain.htm

var termsDefinition = [
    {
        header: "Hedges"
    },
    {
        display: "might",
        terms: ["might"]
    },
    {
        display: "may",
        terms: ["may"]
    },
    {
        display: "maybe",
        terms: ["maybe"]
    },
    {
        display: "perhaps",
        terms: ["perhaps"]
    },
    {
        display: "possible",
        terms: ["possible"]
    },
    {
        display: "about",
        terms: ["about"]
    },
    {
        display: "almost",
        terms: ["almost"]
    },
    {
        display: "nearly",
        terms: ["nearly"]
    },
    {
        display: "apparent",
        terms: ["apparent"]
    },
    {
        display: "appear/appears/appeared",
        terms: ["appear", "appears", "appeared"]
    },
    {
        display: "around",
        terms: ["around"]
    },
    {
        display: "assume/assumes/assumed",
        terms: ["assume", "assumes", "assumed"]
    },
    {
        display: "broadly",
        terms: ["broadly"]
    },
    {
        display: "certain (to a certain degree/extent/..;in certain ways) ",
        terms: ["certain", "to a certain degree", "to a certain extent", "in certain ways"]
    },
    {
        display: "could",
        terms: ["could"]
    },
    {
        display: "doubt/doubts v.",
        terms: ["doubt", "doubts"]
    },
    {
        display: "estimate v.",
        terms: ["estimate v."]
    },
    {
        display: "feel/feels/felt",
        terms: ["feel", "feels", "felt"]
    },
    {
        display: "frequently",
        terms: ["frequently"]
    },
    {
        display: "generally",
        terms: ["generally"]
    },
    {
        display: "in general",
        terms: ["in general"]
    },
    {
        display: "indicate/indicates/indicated",
        terms: ["indicate", "indicates","indicated"]
    },
    {
        display: "most likely",
        terms: ["most likely"]
    },
    {
        display: "more likely",
        terms: ["more likely"]
    },
    {
        display: "least likely",
        terms: ["least likely"]
    },
    {
        display: "less likely",
        terms: ["less likely"]
    },
    {
        display: "likely (without least, more, less, most)",
        terms: ["likely"],
        previousNot: ["least", "more", "less", "most"]
    },
    {
        display: "unlikely",
        terms: ["unlikely"]
    },
    {
        display: "largely",
        terms: ["largely"]
    },
    {
        display: "mainly",
        terms: ["mainly"]
    },
    {
        display: "mostly",
        terms: ["mostly"]
    },
    {
        display: "often",
        terms: ["often"]
    },
    {
        display: "on the whole",
        terms: ["on the whole"]
    },
    {
        display: "ought",
        terms: ["ought"]
    },
    {
        display: "plausible",
        terms: ["plausible"]
    },
    {
        display: "presumable",
        terms: ["presumable"]
    },
    {
        display: "presumably",
        terms: ["presumably"]
    },
    {
        display: "probable",
        terms: ["probable"]
    },
    {
        display: "probably",
        terms: ["probably"]
    },
    {
        display: "quite",
        terms: ["quite"]
    },
    {
        display: "rather (not ”rather than”)",
        terms: ["rather"],
        nextNot: ["than"]
    },
    {
        display: "roughly",
        terms: ["roughly"]
    },
    {
        display: "seem/seems/seemed",
        terms: ["seem", "seems", "seemed"]
    },
    {
        display: "seemingly",
        terms: ["seemingly"]
    },
    {
        display: "should(表猜测)",
        terms: ["should"]
    },
    {
        display: "sometimes",
        terms: ["sometimes"]
    },
    {
        display: "somewhat",
        terms: ["somewhat"]
    },
    {
        display: "suggest/suggests/suggested (说明,暗示,非“建议”)",
        terms: ["suggest", "suggests", "suggested"]
    },
    {
        display: "suppose/supposes/supposed",
        terms: ["suppose"]
    },
    {
        display: "suspect/suspects/suspected",
        terms: ["suspect", "suspects", "suspected"]
    },
    {
        display: "tend to/tends to/tended to",
        terms: ["tend to", "tends to", "tended to"]
    },
    {
        display: "typical of",
        terms: ["typical of"]
    },
    {
        display: "typically",
        terms: ["typically"]
    },
    {
        display: "uncertain (作表语)",
        terms: ["uncertain"]
    },
    {
        display: "unclear (作表语)",
        terms: ["unclear"]
    },
    {
        display: "usually",
        terms: ["usually"]
    },
    {
        display: "would",
        terms: ["would"],
        nextNot: ["not"]
    },
    {
        display: "would not",
        terms: ["would not"]
    },
    {
        display: "argue/argues/argued",
        terms: ["argue", "argues", "argued"]
    },
    {
        display: "claim/claims/claimed v.",
        terms: ["claim", "claims", "claimed"]
    },
    {
        display: "attempt to",
        terms: ["attempt to"]
    },
    {
        display: "imply/implies/implied",
        terms: ["imply", "implies", "implied"]
    },
    {
        header: "Boosters"
    },
    {
        display: "actually",
        terms: ["actually"]
    },
    {
        display: "always",
        terms: ["always"]
    },
    {
        display: "believe/believes/believed",
        terms: ["believe", "believes", "believed"]
    },
    {
        display: "beyond doubt",
        terms: ["beyond doubt"]
    },
    {
        display: "certain",
        terms: ["certain"]
    },
    {
        display: "certainly",
        terms: ["certainly"]
    },
    {
        display: "clear",
        terms: ["clear"]
    },
    {
        display: "clearly",
        terms: ["clearly"]
    },
    {
        display: "conclusively",
        terms: ["conclusively"]
    },
    {
        display: "decidedly",
        terms: ["decidedly"]
    },
    {
        display: "definite",
        terms: ["definite"]
    },
    {
        display: "definitely",
        terms: ["definitely"]
    },
    {
        display: "demonstrate/demonstrates/demonstrated",
        terms: ["demonstrate", "demonstrates", "demonstrated"]
    },
    {
        display: "doubtless",
        terms: ["doubtless"]
    },
    {
        display: "establish/establishes/established",
        terms: ["establish", "establishes", "established"]
    },
    {
        display: "evident",
        terms: ["evident"]
    },
    {
        display: "evidently",
        terms: ["evidently"]
    },
    {
        display: "find/finds/found",
        terms: ["find", "finds", "found"]
    },
    {
        display: "in fact",
        terms: ["in fact"]
    },
    {
        display: "incontestable",
        terms: ["incontestable"]
    },
    {
        display: "incontestably",
        terms: ["incontestably"]
    },
    {
        display: "incontrovertible",
        terms: ["incontrovertible"]
    },
    {
        display: "incontrovertibly",
        terms: ["incontrovertibly"]
    },
    {
        display: "indeed",
        terms: ["indeed"]
    },
    {
        display: "indisputable",
        terms: ["indisputable"]
    },
    {
        display: "indisputably",
        terms: ["indisputably"]
    },
    {
        display: "must (表猜测)",
        terms: ["must"]
    },
    {
        display: "never",
        terms: ["never"]
    },
    {
        display: "no doubt",
        terms: ["no doubt"]
    },
    {
        display: "obvious",
        terms: ["obvious"]
    },
    {
        display: "obviously",
        terms: ["obviously"]
    },
    {
        display: "of course",
        terms: ["of course"]
    },
    {
        display: "prove/proves/proved",
        terms: ["prove", "proves", "proved"]
    },
    {
        display: "realize/realizes/realized (认识到,非“实现”)",
        terms: ["realize", "realizes", "realized"]
    },
    {
        display: "really",
        terms: ["really"]
    },
    {
        display: "show/shows/showed/shown",
        terms: ["show", "shows", "showed", "shown"]
    },
    {
        display: "sure",
        terms: ["sure"]
    },
    {
        display: "surely",
        terms: ["surely"]
    },
    {
        display: "think/thinks/thought",
        terms: ["think", "thinks", "thought"]
    },
    {
        display: "true",
        terms: ["true"]
    },
    {
        display: "truly",
        terms: ["truly"]
    },
    {
        display: "undeniable",
        terms: ["undeniable"]
    },
    {
        display: "undeniably",
        terms: ["undeniably"]
    },
    {
        display: "undisputedly",
        terms: ["undisputedly"]
    },
    {
        display: "undoubtedly",
        terms: ["undoubtedly"]
    },
    {
        display: "without doubt",
        terms: ["without doubt"]
    },
    {
        header: "Self-mentions"
    },
    {
        display: "I",
        terms: ["I"]
    },
    {
        display: "we",
        terms: ["we"]
    },
    {
        display: "me",
        terms: ["me"]
    },
    {
        display: "my",
        terms: ["my"]
    },
    {
        display: "mine",
        terms: ["mine"]
    },
    {
        display: "us",
        terms: ["us"]
    },
    {
        display: "our",
        terms: ["our"]
    },
    {
        display: "the author",
        terms: ["the author"]
    },
    {
        display: "the writer",
        terms: ["the writer"]
    },
    {
        header: "Evidentials"
    }
];

function findCharacter(text, startPos, backwards, chars) {
    var charsArray = chars.split(""), cursor, char;
    if (backwards) {
        cursor = startPos - 1;
        while (cursor >= 0) {
            char = text.charAt(cursor);
            if (charsArray.indexOf(char) >= 0) {
                if (char === "." && text.charAt(cursor - 1).match(/^\d$/) && text.charAt(cursor + 1).match(/^\d$/)) {
                    //handel 4.5 case
                    cursor--;
                }
                else if (char === "." && text.charAt(cursor + 1) === "\"") {
                    //handle ." case
                    return cursor + 1;
                }
                else {
                    return cursor;
                }
            }
            cursor--;
        }
    }
    else {
        cursor = startPos + 1;
        while (cursor < text.length) {
            char = text.charAt(cursor);
            if (charsArray.indexOf(char) >= 0) {
                if (char === "." && text.charAt(cursor - 1).match(/^\d$/) && text.charAt(cursor + 1).match(/^\d$/)) {
                    //handel 4.5 case
                    cursor++;
                }
                else {
                    return cursor;
                }
            }
            cursor++;
        }
    }
    return 0;
}

var xhr = new XMLHttpRequest();
xhr.open("GET", "text.txt");
xhr.onreadystatechange = function (e) {
    if (xhr.readyState === 4) {
        var text = xhr.responseText;
        var results = [], counter = 0;
        for (var i = 0; i < termsDefinition.length; i++) {
            var def = termsDefinition[i];
            var matches = [];
            if (def.header) {
                results.push("\n" + def.header);
                counter = 0;
                continue;
            }
            def.terms.forEach(function (term) {
                term = term.trim();
                term.replace(/ /g, "\\s+");
                var regexp = new RegExp("[\\s\\.,;]" + term + "[\\s\\.,;]", "g");
                var match = regexp.exec(text);
                while (match) {
                    var ok = true;
                    if (def.previousNot) {
                        //find the previous word
                        var start = findCharacter(text, match.index - 1, true, " \n\t,");
                        var word = text.substr(start + 1, match.index - 1 - start);
                        if (def.previousNot.indexOf(word) >= 0) {
                            ok = false;
                        }
                    }
                    if (def.nextNot) {
                        //find the previous word
                        start = findCharacter(text, match.index, false, " \n\t,");
                        var end = findCharacter(text, start, false, " \n\t,");
                        word = text.substr(start + 1, end - start - 1);
                        if (def.nextNot.indexOf(word) >= 0) {
                            ok = false;
                        }
                    }
                    if (ok) {
                        matches.push({
                            position: match.index
                        });
                    }
                    regexp.lastIndex--;  //remove the separator position
                    match = regexp.exec(text);
                }
            });
            //pick up two sentences
            var indexToPickUp = [], max = 2;
            if (matches.length <= max) {
                for (var j = 0; j < matches.length; j++) {
                    indexToPickUp.push(j);
                }
            }
            else {
                while (indexToPickUp.length <= max) {
                    if (indexToPickUp.length === max) {
                        break;
                    }
                    var idx = Math.floor(Math.random() * matches.length);
                    if (indexToPickUp.indexOf(idx) < 0) {
                        indexToPickUp.push(idx);
                    }
                }
            }
            results.push("\n(" + (counter + 1) + ") " + def.display + ", frequency is " + matches.length + (matches.length !== 0 ? ". Eg." : ""));
            counter++;
            if (matches.length !== 0) {
                for (j = 0; j < indexToPickUp.length; j++) {
                    var position = matches[indexToPickUp[j]].position;
                    var start = findCharacter(text, position, true, ".?");
                    var end = findCharacter(text, position + 1, false, ".?");
                    results.push((j === 0 ? "a) " : "b) ") + text.substr(start + 1, end - start).trim().replace(/\s+/g, " "));
                }
            }
        }
        document.body.innerHTML = results.join("<br>").replace(/\n/g, "<br>");
    }
};
xhr.send();

function createTermDef() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "terms.txt");
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            var text = xhr.responseText;
            var str = [];
            text.split("\n").forEach(function (line) {
                if (line) {
                    str.push("{");
                    str.push("display: \"" + line + "\",");
                    str.push("terms: [\"" + line + "\"]");
                    str.push("},");
                }
            });
            console.log(str.join("\n"));
        }
    };
    xhr.send();
}