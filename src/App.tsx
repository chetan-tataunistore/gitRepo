
import { useState, useEffect } from 'react';
import * as React from 'react';
import './App.css';
import { async } from 'q';
import { getDefaultWatermarks } from 'istanbul-lib-report';
import { array, func } from 'prop-types';

export interface Album {
    items: any,
    total_count: string,
    name: any,
    owner: any

}
export interface AlbumList {
    items: any,
    total_count: any,
    name: any,
    owner: any

}
export interface user {
    value: null
}
export interface User {

}
const ID = "Iv1.a1f55f4baa3d29b8"
const secret = " "

const App: React.SFC = () => {
    const [userName, setUserName] = useState('');
    var [resultUsername, storeUserName] = useState<Album[]>([]);
    var [getUsername, fetchUserName] = useState<AlbumList[]>([]);

    const getAlbums = async (userName: string) => {
        let r = await fetch(`https://api.github.com/search/repositories?q=${userName}&client_id=${ID}&client_secret=${secret}&per_page=1`);
        let albums = await r.json();
        return albums;
    }


    function searchUserName(e: React.FormEvent<HTMLInputElement>) {
        setUserName(e.currentTarget.value)
    }
    function getUserAlbums() {
        getAlbums(userName).then(r => storeUserName([r]));


    }

    function getUserAlbums2() {
        let x = getUsername.sort((a, b) => {
            return a.total_count - b.total_count
        })
        fetchUserName(getUsername.concat(resultUsername));

    }

    return (
        <div className="repo">
            <div>
                <h3 className="GitHeader">Git RepoList</h3>
            </div>
            <div className="search">
                <div className="searchBox">
                    <input className="Input" onChange={searchUserName} />
                    <button className="button" onClick={getUserAlbums}>Search</button>

                </div>
                <div className="serachResult">
                    {resultUsername &&
                        resultUsername.map((r, i) => (
                            <div key={i} className="resultContainer" onClick={getUserAlbums2} >
                                <div className="resultImageHandler">
                                    {r.items && r.items[0] && r.items[0].owner && r.items[0].owner.avatar_url && <img className="resultOwnerImage" src={r.items[0].owner.avatar_url} />}
                                </div>
                                <div className="contentHandler">
                                    <div className="totalCount"> Total Count {r.total_count}</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className="repoList">
                {getUsername &&
                    getUsername.map((r, i) => (
                        <div key={i} className="repoContainer">
                            <div className="imageHandler">
                                <img className="OwnerImage" src={r.items[0].owner.avatar_url} />
                            </div>
                            <div className="contentHandler">
                                <div className="totalCount"> Total Count {r.total_count}</div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
};

export default App;
