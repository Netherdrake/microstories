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
    }
});

Stories.allow({
  insert: function() {
    return true;
  }
});

Stories.deny({
  insert: function(fieldNames) {
    return (_.without(fieldNames, 'data').length > 0);
  }
});
