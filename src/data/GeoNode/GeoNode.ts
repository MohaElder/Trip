export type GeoNode = {
    coordinate: {
        coordinates: Array<number>
        type: string
    }
    
    properties: {
        accuracy: string
        addendum: Object
        continent: string
        continent_gid: string
        country: string
        country_a: string
        country_gid: string
        county: string
        county_gid: string
        gid: string
        id: string
        label: string
        layer: string
        locality: string
        locality_gid: string
        name: string
        region: string
        region_a: string
        region_gid: string
        source: string
        source_id: string
    }
}