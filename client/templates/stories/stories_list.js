Template.storiesList.helpers({
    stories: Stories.find({}, {sort:{submittedAt: -1}}),
});

if (Meteor.isClient) {
    var voteStory = function(story, vote){
        Meteor.call('voteStory', story, vote, function(error, result) {
            if (error) {
                alert(error);
            }

            // Router.go('storyPage', {_id: result._id});
        });
    };
}

Template.story.events({
    'click .glyphicon-chevron-up' : function() {
        voteStory(this, 1);
    },
    'click .glyphicon-chevron-down' : function() {
        voteStory(this, -1);
    }
});


Template.story.helpers({
    elapsedTime: function() {
        return moment().from(this.submittedAt);
    },
});
