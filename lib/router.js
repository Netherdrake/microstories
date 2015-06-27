Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});

Router.route('/', {name: 'storiesPage'});

Router.route('/story/:slug', {
    name: 'storyPage',
    waitOn: function() { Meteor.subscribe("stories"); },
    data: function() {
        return Stories.findOne({slug: this.params.slug});
    }
});
