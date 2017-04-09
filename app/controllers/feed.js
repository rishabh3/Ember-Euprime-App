import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import PouchDB from 'pouchdb';
/*store*/
export default Ember.Controller.extend({
        stats : storageFor('stats'),
        info : storageFor('info'),
        posttitle : '',
        postdes : '',
        postaname : '',
        count : 0,
        dbname : ' ',
        actions : {
                // showall : function(){
                //         var db = new PouchDB("http://localhost:5984/post");
                //         var z = document.getElementById('div13');
                //         var temp = this;
                //         db.allDocs({
                //                 include_docs : true
                //         }).then(function(result){
                //                 for(var i = 0;i < result.rows.length;i++){
                //                         temp.alldoc.push(result.rows[i].doc._id);
                //                 }
                //
                //         });
                //         var btn = document.getElementById('btn8');
                //         if(z.style.display === 'none'){
                //                 z.style.display='block';
                //                 btn.textContent = 'Hide All Docs';
                //         }else{
                //                 z.style.display='none';
                //                 btn.textContent = 'Show All Docs';
                //         }
                //         db.close();
                // },
                showerr : function () {
                        var z = document.getElementById('div3');
                        var btn = document.getElementById('btn11');
                        if(z.style.display === 'none'){
                                z.style.display='block';
                                btn.textContent = 'Hide Error';
                        }else{
                                z.style.display='none';
                                btn.textContent = 'Show Error';
                                this.get('info').clear();
                        }
                },
                showdetail : function () {
                        var dbs = store.get('db.post.documents');
                        var temp = this;
                        dbs.info().then(function(x){
                                temp.set('count',x.doc_count);
                                temp.set('dbname',x.db_name);
                        });
                        //
                        var z = document.getElementById('div2');
                        var btn = document.getElementById('btn12');
                        if(z.style.display === 'none'){
                                z.style.display='block';
                                btn.textContent = 'Hide Details';
                        }else{
                                z.style.display='none';
                                btn.textContent = 'Show Details';
                        }

                },
                deleteSession : function (){
                        var dbs = store.get('db.session.documents');
                        var temp = this;
                        var rev;
                        console.log(temp.get('stats.session_id'));
                        dbs.load(temp.get('stats.session_id')).then(function(doc){
                                rev = doc._rev;
                                return rev;
                        }).then(function(x){
                                dbs.delete(temp.get('stats.session_id'),x);
                        }).then(function(){
                                temp.get('stats').clear();
                                window.location.href = "home";
                        });

                },
                search : function(){
                        // var a = document.getElementById('txt');
                        // if(a.style.display==='none'){
                        //         a.style.display='block';
                        // }else{
                        //         document.getElementById('txt').style.display='none';
                        // }
                        var db = new PouchDB("http://localhost:5984/post");
                        var title = this.get('title');
                        var temp = this;
                        db.get(title).then(function(doc){
                                temp.set('posttitle',doc._id);
                                temp.set('postdes',doc.description);
                                temp.set('postaname',doc.authname);
                        }).catch(function(err){
                                temp.set('info.error',err.message);
                        });
                        this.set('title','');
                        // this.get('info').clear();
                        db.close();
                },
                edit : function(){
                        var a = document.getElementById('frm1');
                        this.set('title',this.get('posttitle'));
                        this.set('des',this.get('postdes'));
                        this.set('authname',this.get('postaname'));
                        a.style.display = 'block';
                },
                cancel : function(){
                        var a = document.getElementById('frm1');
                        a.style.display = 'none';
                },
                save : function(){
                        var title = this.get('title');
                        var des = this.get('des');
                        var authname = this.get('authname');
                        var db = store.get('db.post.documents');
                        var temp = this;
                        var dbs;
			if(temp.get('posttitle') === undefined || temp.get('posttitle') === ''){
                       	 db.save({
                                _id : title,
                                description : des,
                                authname : authname
                       	 }).catch(function(err){
                                temp.set('info.error',err.message);
                       	 });
			}
			else{
				dbs = new PouchDB('http://localhost:5984/post');
				var y ;
				var temp = this;
				dbs.get(temp.get('posttitle')).then(function(doc){
					if(des !== undefined && authname !== undefined){
					return  dbs.put({
						_id : temp.get('posttitle'),
						_rev : doc._rev,
						description : des,
						authname : authname
					});}
					else if(des===undefined){
					return dbs.put({
						_id : temp.get('posttitle'),
						_rev : doc._rev,
                                                description : temp.get('postdes'),
						authname : authname
					});}
					else if(authname === undefined){
					return dbs.put({
						_id : temp.get('posttitle'),
						_rev : doc._rev,
						description : des,
                                                authname : temp.get('postaname')
					});}


				}).then(function(response){
					temp.set('info.error',response.message);
				}).catch(function(err){
					console.log(err);
				});


		 	}
                        //dbs.close();
                        var a = document.getElementById('frm1');
                        this.set('title','');
                        this.set('des','');
                        this.set('authname','');
                        a.style.display = 'none';                  

                },
                deletePost : function(){
                        var db = store.get('db.post.documents');
                        var temp = this;
                        var id = temp.get('posttitle');
                        if(this.get('posttitle') === ''){
                                this.set('info.error','Nothing is provided to delete!');
                        }
                        else{
                                db.load(id).then(function(doc){
                                        db.delete(id,doc._rev);
                                }).catch(function (err) {
                                        temp.set('info.error',err.message);
                                })

                        }
                        //this.get('info').clear();
                        this.set('posttitle','');
                        this.set('postdes','');
                        this.set('postaname','');
                }


         }
});
