import * as C from './styles';

interface PhotoItemProps {
    url: string;
    name: string;
}

export const PhotoItem = ({ url, name }: PhotoItemProps) => {
    return (
        <C.Container>
            <img src={url} alt={name} />
            {name}
        </C.Container>
    )
}