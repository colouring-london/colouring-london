import React from 'react';
import { Link } from 'react-router-dom';
import InfoBox from '../../components/info-box';

import { Category } from '../../config/categories-config';
import { dataFields } from '../../config/data-fields-config';

import DataEntry from '../data-components/data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import { DynamicsBuildingPane, DynamicsDataEntry } from '../data-components/dynamics-data-entry/dynamics-data-entry';
import { FieldRow } from '../data-components/field-row';
import NumericDataEntry from '../data-components/numeric-data-entry';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

/**
* Dynamics view/edit section
*/
const DynamicsView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const building = props.building;
    const thisYear = (new Date()).getFullYear();
    const currentBuildingConstructionYear = building.date_year || undefined;

    const ageLinkUrl = `/${props.mode}/${Category.Age}/${props.building.building_id}`;

    return (<>
        <DataEntryGroup collapsed={false} name="Historical constructions and demolitions" showCount={false}>
            <DynamicsBuildingPane>
                <label>Current building (see <Link to={ageLinkUrl}>Age</Link>)</label>
                <FieldRow>
                    <NumericDataEntry
                        slug=''
                        title={dataFields.past_buildings.items.year_constructed.title}
                        value={currentBuildingConstructionYear}
                        disabled={true}
                        mode='view'
                    />
                    <NumericDataEntry
                        slug=''
                        title={dataFields.past_buildings.items.year_demolished.title}
                        value={undefined}
                        placeholder='---'
                        disabled={true}
                        mode='view'
                    />
                    <NumericDataEntry
                        slug=''
                        title='Lifespan (to date)'
                        value={ thisYear - currentBuildingConstructionYear}
                        disabled={true}
                        mode='view'
                    />
                </FieldRow>
            </DynamicsBuildingPane>
            {
                currentBuildingConstructionYear != undefined ?
                    <>
                        <DynamicsDataEntry
                            value={building.past_buildings}
                            editableEntries={true}
                            slug='past_buildings'
                            title={undefined}
                            mode={props.mode}
                            onChange={props.onChange}
                            maxYear={currentBuildingConstructionYear}
                            minYear={50}
                        />
                        {
                            props.mode === 'view' &&
                                <InfoBox>Switch to edit mode to add historical records</InfoBox>
                        }
                    </> :
                    <InfoBox>To add historical records, fill in the <Link to={ageLinkUrl}>Age</Link> data first.</InfoBox>
            }
            
        </DataEntryGroup>

        <DataEntryGroup name="Future planned data collection" collapsed={false}>
            <DataEntry
                title="Historical land use change"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Longitudinal historical footprints (raster) link"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Longitudinal historical footprints (vector) link"
                slug=""
                value=""
                mode='view'
            />
        </DataEntryGroup>
        <InfoBox>
            This section is under development in collaboration with the historic environment sector.
            Please let us know your thoughts on the <a href="https://discuss.colouring.london" target="_blank">discussion forum</a>!
        </InfoBox>
    </>)
};

const DynamicsContainer = withCopyEdit(DynamicsView);

export default DynamicsContainer;
