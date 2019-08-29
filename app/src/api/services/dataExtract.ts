import path from 'path';

import db from '../../db';

interface DataExtractRow {
    extract_id: number;
    extracted_on: Date;
    extract_path: string;
}

interface DataExtract {
    extract_id: number;
    extracted_on: Date;
    download_path: string;
}

export async function listDataExtracts(): Promise<DataExtract[]> {
    try {
        const extractRecords = await db.many<DataExtractRow>(
            `SELECT
                extract_id, extracted_on, extract_path
            FROM bulk_extracts`
        );

        return extractRecords.map(getDataExtractFromRow);
    } catch (err) {
        console.error('Error:', err);
        return undefined;
    }
}

export async function getDataExtractById(extractId: number): Promise<DataExtract> {
    try {
        const extractRecord = await db.one<DataExtractRow>(
            `SELECT 
                extract_id, extracted_on, extract_path
            FROM bulk_extracts
            WHERE extract_id = $1
            `, [extractId]);

        return getDataExtractFromRow(extractRecord);
    } catch (err) {
        console.error('Error:', err);
        return undefined;
    }
}

function getDataExtractFromRow(er: DataExtractRow): DataExtract {
    return {
        extract_id: er.extract_id,
        extracted_on: er.extracted_on,
        download_path: getDownloadLinkForExtract(er)
    }
}

function getDownloadLinkForExtract(extract: DataExtractRow): string {
    const file_name = path.basename(extract.extract_path);
    return `/downloads/extracts/${file_name}`; // TODO: potentially move base path to env var
}