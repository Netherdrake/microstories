Template.storiesPage.helpers({
    hot: function() {
        return Stories.find({});
    },
    hotProperties: function() {
        return {
            theme: "danger",
            title: "HOT"
        };
    }
});
