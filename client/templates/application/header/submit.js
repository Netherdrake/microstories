Template.submit.events({
    'submit form': function(e) {
        e.preventDefault();

        var story = {
            body: $(e.target).find('[name=body]').val()
        };
        $(e.target).find('[name=body]').val('');

        Meteor.call('insertStory', story, function(error, result) {
            if (error) {
                alert(error);
            }

            // Router.go('storyPage', {_id: result._id});
        });
    }
});
