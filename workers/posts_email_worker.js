const queue = require('../config/kue');

const postsMailer = require('../mailers/posts_mailer');

queue.process('newPosts',function(job,done){

    console.log('emails worker is processing Posts job',job.data);

    postsMailer.newPost(job.data);
    done();
})