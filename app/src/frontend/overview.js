import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import Sidebar from './sidebar';
import { EditIcon } from './icons';
import CONFIG from './fields-config.json';

const Overview = (props) => {
    var data_layer = 'age'; // always default
    if (props.match && props.match.params && props.match.params.cat) {
        data_layer = props.match.params.cat;
    }

    if (props.mode === 'edit' && !props.user){
        return <Redirect to="/sign-up.html" />
    }

    let title = (props.mode === 'view')? 'View maps' : 'Add or edit data';

    return (
        <Sidebar title={title}>
            {
                CONFIG.map((data_group) => (
                    <OverviewSection {...data_group}
                        data_layer={data_layer} key={data_group.slug} mode={props.mode} />
                ))
            }
        </Sidebar>
    );
}

const OverviewSection = (props) => {
    const match = props.data_layer === props.slug;
    const inactive = props.inactive;
    return (
        <section className={(inactive? "inactive ": "") + "data-section legend"}>
            <header className={(match? "active " : "") + " section-header view"}>
                <NavLink
                    to={`/${props.mode}/${props.slug}.html`}
                    isActive={() => match}
                    title={(inactive)? 'Coming soon… Click the ? for more info.' :
                        (match)? '' : 'Show on map'}>
                    <h3 className="h3">{props.title}</h3>
                </NavLink>
                <nav className="icon-buttons">
                    {
                        props.help?
                        <a className="icon-button help" href={props.help}>
                            More info
                        </a>
                        : null
                    }
                    {
                        props.mode === 'view'?
                        <NavLink className="icon-button edit" title="Edit data"
                            to={`/edit/${props.slug}.html`}>
                            Edit
                            <EditIcon />
                        </NavLink>
                        : null
                    }
                </nav>
            </header>
            {
                (match && props.intro)?
                (<p class="data-intro">{props.intro}</p>)
                : null
            }
        </section>
    )
};

export default Overview;