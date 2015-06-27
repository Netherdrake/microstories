Template.storiesList.helpers({
    stories: Stories.find({}, {sort:{submittedAt: -1}}),
});


Template.story.helpers({
    elapsedTime: function() {
        return moment().from(this.submittedAt);
    }
});
