Template.tesseract.helpers({
  uploadWatcher: function () {
    return {
      finished: function (index, fileInfo, context) {
        console.log(fileInfo);
        Session.set('loading', true);
        Meteor.call('invokeTesseract', fileInfo.path, function (error, result) {
          if (error) {
            console.log(error);
            fs.unlinkSync(fileInfo.url);
          } else {
            //console.log(licenceDetails);
            if (typeof result === 'object') {
              Session.set("result", 'Error');
            } else {
              Session.set("result", result);
              Session.set('loading', false);
            }
          }
        });

      }
    }
  },
  'getResult': function () {
    return Session.get("result");
  },
  'loading': function () {
    return Session.get('loading');
  }
});

Template.tesseract.events({
  'click #reset': function (e) {
    Session.set('result', '');
    Session.set('loading', false);
  }
});