import React, { useEffect, useState } from 'react'
import Flavor from '../../../dataTypes/flavor';
import { getPromiseFlavors } from '../../../helpers/promises';
import ItemChooser from './itemChoser'

interface IProps {
  id: number;
}

const ItemChoserContainer: React.FC<IProps> = ({id}) => {
  const [flavors, setFlavors] = useState<Flavor[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<Flavor[]>([]);

  useEffect(() => {
    let isMounted = true;

    const setIfMounted = (flavors: Flavor[]) => {
      if (isMounted) {setFlavors(flavors)}
    }

    getPromiseFlavors(setIfMounted);
    
    return () => {isMounted = false}
  }, [])

  return (
    <ItemChooser 
      imgWidth={500}
      itemId={id}
      items={flavors}
      selectedItems={selectedFlavors}
      setSelectedItems={setSelectedFlavors}
    />
  )
}

export default ItemChoserContainer