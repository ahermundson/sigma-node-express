function songDuplicateCheck(songObject, songsArray) {
  for (var i = 0; i < songsArray.length; i++) {
    if(songObject.title === songsArray[i].title) {
      console.log(songObject.title + " " + songsArray[i].title);
      console.log("duplicate");
      return true;
    }
  }
  return false;
}

module.exports = songDuplicateCheck;
