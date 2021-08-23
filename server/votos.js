const albums = [
  {
    artist: "Pearl Jam",
    album: "Ten",
    year: "1991",
  },
  {
    artist: "Pearl Jam",
    album: "Yield",
    year: "1998",
  },
];
const votes = [
  { user: "p0gh0st", vote: "perxitaaJaja perxitaaJaja perxitaaJaja" },
  {
    user: "DaysiFlo",
    vote: "perxitaaNervous perxitaaNervous perxitaaNervous",
  },
  {
    user: "barbara_sandoval13",
    vote: "perxitaaNervous perxitaaNervous perxitaaNervous perxitaaNervous",
  },
  {
    user: "limoncito_agrioo",
    vote: "perxitaaJaja perxitaaJaja perxitaaJaja perxitaaJaja perxitaaJaja perxitaaJaja",
  },
  {
    user: "ninaim",
    vote: "perxitaaPalomitas perxitaaPalomitas perxitaaPalomitas perxitaaPalomitas perxitaaPalomitas perxitaaPalomitas perxitaaPalomitas",
  },
  {
    user: "w4nder_0",
    vote: "perxitaaNervous perxitaaNervous perxitaaNervous perxitaaNervous perxitaaNervous",
  },
  { user: "saturzn", vote: "ya nadie le tiene respeto a Carlo" },
  { user: "meilywiwa", vote: "perxitaaCarlo" },
];

function groupBy(collection, property) {
  var i = 0,
    val,
    index,
    values = [],
    result = [];
  for (; i < collection.length; i++) {
    val = collection[i][property];
    console.log(`val: ${val}`);
    index = values.indexOf(val);
    console.log(`index: ${index}`);
    if (index > -1) result[index].push(collection[i]);
    else {
      values.push(val);
      result.push([collection[i]]);
    }
  }
  return result;
}
function cleanVotes(listVote, field) {
  let cleanVotesList = [];
  listVote.forEach((item) => {
    let voteObject = {
      key: item[0][field],
      total: item.length,
    };
    cleanVotesList.push(voteObject);
  });
  return cleanVotesList;
}
function processVotes(listVotes, field) {
  console.log(listVotes);
  let objResult = groupBy(listVotes, field);
  console.log(objResult);
  let resultVotes = cleanVotes(objResult, field);
  console.log(resultVotes);
  let orderVotes = resultVotes.sort(
    (a, b) => parseFloat(b.total) - parseFloat(a.total)
  );
  console.log(`----------------------------------------`);
  console.log(orderVotes);
  return orderVotes;
}

// console.log(cleanVotes(groupBy(albums, "year")));
// console.log(cleanVotes(groupBy(votes, "vote")));
console.log(processVotes(albums, "year"));
console.log(processVotes(votes, "vote"));
