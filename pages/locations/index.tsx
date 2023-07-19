import { QueryClient, dehydrate, useQueries, useQuery } from '@tanstack/react-query';
import { API } from 'assets/api/api';
import { LocationType, ResponseType } from 'assets/api/rick-and-morty-api';
import { Card } from 'components/Card/Card';

import { Header } from 'components/Header/Header';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';

/* export const getStaticProps = async () => {
    const characters = await API.rickAndMorty.getCharacters();

    return {
        props: {
            characters,
        },
    };
}; */
/* type PropsType = {
    characters: ResponseType<CharacterType>;
}; */

const getLocations = () => {
    return fetch('https://rickandmortyapi.com/api/location', {
        method: 'GET',
    }).then((res) => {
        return res.json();
    });
};
export const getStaticProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.fetchQuery(['locations'], getLocations);

    return {
        props: {
            dehydraredState: dehydrate(queryClient),
        },
    };
};
const Characters = () => {
    const { data: locations } = useQuery<ResponseType<LocationType>>(['locations'], getLocations);

    if (!locations) {
        return null;
    }

    const locationsList = locations.results.map((location) => (
        <Card key={location.id} name={location.name} />
    ));
    return (
        <PageWrapper>
            <Header />
            {locationsList}
        </PageWrapper>
    );
};

export default Characters;
