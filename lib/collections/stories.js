Stories = new Mongo.Collection('stories');

Meteor.methods({
    // this makes allow(), deny() insert obosolete
    insertStory: function(storyAttributes) {
        // todo check user priviliges
        check(storyAttributes, {
            body: String
        });

        var story = _.extend(storyAttributes, {
            userId: null,
            author: 'Anonymous',
            score: 0,
            slug: slugify(storyAttributes.body),
            submittedAt: new Date()
        });

        // attach our user
        var user = Meteor.user();
        if (user) {
            story.userId = user._id;
            story.author =  user.profile.name || user.username || user.emails[0].address;
        }

        // check for duplicates
        var duplicate = Stories.findOne({slug: story.slug});
        if (duplicate) {
            // todo raise error
            return  {
                _id: duplicate._id
            };
        }

        // insert our story
        var storyId = Stories.insert(story);

        return {
            _id: storyId
        };
    },
    voteStory: function(story, vote) {
        // todo check user priviliges

        // check for value
        if (vote !== -1 && vote !== 1) {
            // todo raise error
            return
        }

        // update our story
        Stories.update(story._id, {$inc: {score: vote}}, function(error) {
            if (error) {
                // todo raise error
            }
        });

    }
});

Stories.allow({
});

Stories.deny({
});
