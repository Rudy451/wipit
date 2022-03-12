import { useState, useEffect } from 'react';
import methods from '../services';
import { useParams } from 'react-router-dom';
import { Button, Text } from 'rebass';
import LogoutButton from '../components/LogoutButton';
import GalleristProfileButton from '../styled-components/gallerist/route-buttons/ProfileButton';
import GalleristCardList from '../styled-components/gallerist/lists/GalleristCardList';
import GalleristWipsButton from '../styled-components/gallerist/route-buttons/WipsButton';
import {Box, Image, Badge} from '@chakra-ui/react';

function GalleristWip() {
  type wipType = {
  wip_title: string,
  wip_cards: [any],
  update_request: string,
  update_request_date: string,
  }

  const { title } = useParams();
  const [wip, setWip] = useState<wipType | null>(null);


  useEffect(() => {
    methods
      .getWips()
      .then((response) => {
        console.log(response);
        const wip = response.filter((card) =>
          card.wip_title.includes(title)
        )[0];
        setWip(wip);
      })
      .catch((error) => {
        console.log(error);
        console.log('Error occured.');
      });
  }, [title]);

  const handleClick = () => {
    // methods.updateRequest(wip._id, 'true');
  };

  return (
    <Box
    w='400px'
    rounded='20px'
    overflow='hidden'
    boxShadow='sm'
    bg='gray.200'>

    </Box>
    // <div>
    //   <GalleristProfileButton />
    //   <GalleristWipsButton />
    //   <LogoutButton />
    //   {wip.wip_cards ? (
    //     <GalleristCardList cards={wip.wip_cards} wip={wip}></GalleristCardList>
    //   ) : null}
    //   {wip.update_request === 'false' ? (
    //     <Button backgroundColor='#33e' mr={2} onClick={handleClick}>
    //       {' '}
    //       Request Update{' '}
    //     </Button>
    //   ) : (
    //     <Text> You have requested an update</Text>
    //   )}
    // </div>
  );
}

export default GalleristWip;
