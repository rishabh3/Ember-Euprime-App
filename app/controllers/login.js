import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
/*store*/
export default Ember.Controller.extend({
        stats : storageFor('stats'),
        info : storageFor('info'),
        actions :{
                cancel : function(){
                        window.location.href = "home";
                },
                login : function(){
                        var uname = this.get('uname');
                        var pwd = this.get('pwd');

                        if(uname === undefined || pwd === undefined){
                                this.set('info.error','Please fill all the blanks!');
                        }else{
                                //alert('session-info');
                                var db = store.get('db.main.documents');
                                var dbs = store.get('db.session.documents');
                                var temp = this;
                                db.load(uname).then(function (doc){
                                        if(doc.password === pwd){
                                                dbs.save({
                                                        _id : uname.concat('_session'),
                                                        uname : doc._id,
                                                        mail : doc.mail,
                                                        name : doc.name
                                                });
                                                //temp.set('info.success','Successfully logged in!');
                                                temp.set('stats.session_id',uname.concat('_session'));
                                                temp.set('stats.email_id',doc.mail);
                                                temp.set('stats.name',doc.name);
                                                temp.set('stats.uname',doc._id);
                                                window.location.href = "feed";
                                                temp.get('info').clear();
                                        }
                                        else{
                                                temp.set('info.error','Incorrect Password!');
                                        }
                                }).catch(function(err){
                                        temp.set('info.error',err.message);
                                });
                                this.set('uname','');
                                this.set('pwd','');
                                this.get('info').clear();

                        }

                }
        }
});
