import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {

  }
  getQuery( query: string){
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQD5PWE8RlF7rAI0ot5hWwua_5GemKF4nR6NNveQ3MxG2WuLDSoAwEoJS8pKjc5V-0Lu67Gf8dGYmW0-NSo'
    });
    return this.http.get(url,{ headers });
  }
  getNewReleases(){
    return this.getQuery('browse/new-releases')
            .pipe(map( data => data['albums'].items ));
  } 
  getArtistas(termino: string){
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
             .pipe(map( data => data['artists'].items));
  }
  getArtista(id: string){
    return this.getQuery(`artists/${id}`);
  }
  getTopTracks(id: string){
    return this.getQuery(`artists/${id}/top-tracks?country=US`)
    .pipe(map( data => data['tracks']));
  }
}