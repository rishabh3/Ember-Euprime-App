import Ember from 'ember';
// import PouchDB from 'pouchdb';
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
                        var error = false;
                        var name = this.get('name');
                        var mail_id = this.get('email');
                        var uname = this.get('uname');
                        var pwd = this.get('pwd');
                        var conpwd = this.get('conpwd');
                        if(pwd === undefined || uname === undefined || conpwd === undefined || name === undefined || mail_id === undefined){
                                this.set('info.error','Please fill all the blanks!');
                                error = true;
                                //this.get('info').clear();
                        }
                        if(pwd !== undefined && pwd.length < 4){
                                this.set('info.error','Too Short Password!');
                                error = true;
                                //this.get('info').clear();
                        }
                        if(pwd !== undefined && pwd.length > 8){
                                this.set('info.error','Too Long Password!');
                                error = true;
                                //this.get('info').clear();
                        }
                        if(pwd !== conpwd){
                                this.set('info.error','Password are not matching!');
                                error = true;
                                //this.get('info').clear();
                        }
                        if(!error){
                                var db = store.get('db.main.documents');
                                var dbs = store.get('db.session.documents');
                                var temp = this;
                                db.save(
                                        {
                                                name : name,
                                                mail : mail_id,
                                                _id : uname,
                                                password : pwd
                                        }
                                ).then(function() {
                                        //temp.set('info.success','New User is registered!');
                                        dbs.save({
                                                _id : uname.concat('_session'),
                                                uname : uname,
                                                mail : mail_id,
                                                name : name
                                        });
                                        temp.set('stats.session_id',uname.concat('_session'));
                                        temp.set('stats.email_id',mail_id);
                                        temp.set('stats.name',name);
                                        temp.set('stats.uname',uname);
                                        window.location.href = "feed";
                                        temp.get('info').clear();
                                }).catch(function(err){
                                        if(err){
                                                temp.set('info.error','Username is taken!');
                                        }

                                });
                                this.set('name','');
                                this.set('email','');
                                this.set('uname','');
                                this.set('pwd','');
                                this.set('conpwd','');
                                this.get('info').clear();
                        }
                        else{
                                this.set('name','');
                                this.set('email','');
                                this.set('uname','');
                                this.set('pwd','');
                                this.set('conpwd','');


                        }

                }
        }
});
