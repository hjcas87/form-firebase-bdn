import { useSelector } from 'react-redux';
import { ReleaseCard } from './ReleaseCard';

export const ReleaseList = () => {
    const { releases } = useSelector((state) => state.realeases);

    return (
        <>
            {releases.map((release) => (
                <ReleaseCard key={release.id} {...release} />
            ))}
        </>
    );
};
