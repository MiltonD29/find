import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DbProvider {

  db : SQLiteObject = null;
  constructor( public sqlite: SQLite ) {
    console.log('Hello DbProvider Provider');
  }

  public openDb(){
      return this.sqlite.create({
          name: 'data.db',
          location: 'default' // el campo location es obligatorio
      })
      .then((db: SQLiteObject) => {
       this.db =db;
     })
  }

  public createTableCarros(){
    return this.db.executeSql("create table if not exists carros( id INTEGER PRIMARY KEY AUTOINCREMENT, lat FLOAT, lng FLOAT, address TEXT, description TEXT, foto TEXT )",{})
  }

  public addCarro(carro){
    let sql = "INSERT INTO carros (lat, lng, address, description, foto) values (?,?,?,?,?)";
    return this.db.executeSql(sql,[carro.lat,carro.lng,carro.address,carro.description,carro.foto]);
  }

  public getCarros(){
    let sql = "SELECT * FROM carros";
    return this.db.executeSql(sql,{});
  }

  public modificaCarro(carro){
    let sql = "UPDATE carros  SET lat = ?, lng = ?, address = ?, description = ?, foto = ? WHERE id = ? ";
    return this.db.executeSql(sql,[carro.lat,carro.lng,carro.address,carro.description,carro.foto, carro.id]);
  }

  public borrarCarro(id){
     let sql = "DELETE FROM carros WHERE id= ? ";
     return this.db.executeSql(sql,[id]);
  }

}
