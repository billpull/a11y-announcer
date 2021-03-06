import Ember from 'ember';
import Router from '../router';

export default {
  name: 'add-announcer-to-router',
  initialize: function(app) {
    Router.reopen({
      announcer: Ember.inject.service('announcer'),
      didTransition: function() {
        this._super(...arguments);

        Ember.run.later(this, () => {
          let pageTitle = Ember.$('title').html().trim();
          let serviceMessage = this.get('announcer.message');
          let message = `${pageTitle} ${serviceMessage}`;

          this.get('announcer').announce(message, 'polite');
        }, 100);
      }
    });
  }
};
