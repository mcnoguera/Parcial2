import React, { useEffect, useState } from 'react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { FormattedMessage } from 'react-intl';


export const TableComponent = () => {

    const [pokemons, setPokemons] = useState([])

    useEffect(() => {

        if (!navigator.onLine) {
            if (localStorage.getItem("pokemons") === null) {
                setPokemons([])
            } else {
                setPokemons(JSON.parse(localStorage.getItem("pokemons")));
            }
        } else {
            const language = navigator.language.split(/[-_]/)[0];  // language without region code
            const URL = (language === 'es') ? "https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json" : "https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json";
            fetch(URL).then(res => res.json()).then(res => {
                setPokemons(res);
                console.log(res)
                localStorage.setItem("pokemons", JSON.stringify(res));
            })
        }
    }, [])

    return (
        <div className="container">

            <table className="table">
                <thead className="thead-dark">

                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">
                            <FormattedMessage id="app.image" />
                        </th>
                        <th scope="col"><FormattedMessage id="app.name" /></th>
                        <th scope="col"><FormattedMessage id="app.description" /></th>
                        <th scope="col"><FormattedMessage id="app.height" /></th>
                        <th scope="col"><FormattedMessage id="app.weight" /></th>
                        <th scope="col"><FormattedMessage id="app.type" /></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        pokemons.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td><img src={element.ThumbnailImage} alt="" /></td>
                                    <td>{element.ThumbnailAltText}</td>
                                    <td>
                                        {/* <FormattedMessage id="app.learn-react-link">
                                            
                                        </FormattedMessage> */}
                                        {element.description}</td>
                                    <td>{element.height}</td>
                                    <td>{element.weight}</td>
                                    <td>{
                                        element.type.map((type, indexb) => {
                                            return (
                                                <span key={indexb} className="badge badge-secondary">{type}</span>
                                            )
                                        })
                                    }</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <ResponsiveContainer width="95%" height={400}>
                <BarChart
                    // width={700}
                    // height={300}
                    data={pokemons}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis dataKey="height" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="height" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

        </div>
    )
}
