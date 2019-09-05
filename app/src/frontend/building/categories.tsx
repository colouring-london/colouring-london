import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Sidebar from './sidebar';

import './categories.css'

const Categories = (props) => (
    <ol className="data-category-list">
        <Category
            title="Location"
            desc="Where's the building?"
            slug="location"
            help="https://pages.colouring.london/location"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Land Use"
            desc="What's it used for?"
            slug="use"
            help="https://pages.colouring.london/use"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Type"
            desc="Building type"
            slug="type"
            help="https://pages.colouring.london/buildingtypology"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Age"
            desc="Age and history"
            slug="age"
            help="https://pages.colouring.london/age"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Size &amp; Shape"
            desc="Form and scale"
            slug="size"
            help="https://pages.colouring.london/shapeandsize"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Construction"
            desc="Methods and materials"
            slug="construction"
            help="https://pages.colouring.london/construction"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Team"
            desc="Builder and designer"
            slug="team"
            help="https://pages.colouring.london/team"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Sustainability"
            desc="Performance"
            slug="sustainability"
            help="https://pages.colouring.london/sustainability"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Greenery"
            desc="Green context"
            slug="greenery"
            help="https://pages.colouring.london/greenery"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Community"
            desc="Public asset?"
            slug="community"
            help="https://pages.colouring.london/community"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Planning"
            desc="Special controls?"
            slug="planning"
            help="https://pages.colouring.london/planning"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <Category
            title="Like Me?"
            desc="Adds to the city?"
            slug="like"
            help="https://pages.colouring.london/likeme"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
    </ol>
)

Categories.propTypes = {
    mode: PropTypes.string,
    building_id: PropTypes.number
}

const Category = (props) => (
    <li className={`category-block ${props.slug} background-${props.slug}`}>
        <NavLink
            className="category-link"
            to={`/${props.mode}/${props.slug}/building/${props.building_id}.html`}
            title={
                (props.inactive)?
                    'Coming soon… Click more info for details.'
                    : 'View/Edit Map'
            }>
            <h3 className="category">{props.title}</h3>
            <p className="description">{props.desc}</p>
        </NavLink>
        <a className="icon-button help" href={props.help}>
            More
        </a>
    </li>
)

Category.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    slug: PropTypes.string,
    help: PropTypes.string,
    inactive: PropTypes.bool,
    mode: PropTypes.string,
    building_id: PropTypes.number
}

export default Categories;