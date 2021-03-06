import React, { useCallback, useEffect, useState } from 'react'

import Flavor from '../../../../dataTypes/items/flavor';
import ModalRecipientes from './itemChoserModal';

import './itemChoser.css'

interface IProps {
  imgWidth: number;
  imgHeight: number;
  itemId: string;
  maxFlavors: number;
  flavors: Flavor[];
  selectedFlavors: Flavor[];
  setSelectedFlavors: any;
}

const ItemChooser: React.FC<IProps> = ({imgWidth, imgHeight, itemId, maxFlavors, flavors, selectedFlavors, setSelectedFlavors}) => {
  const [show, setShow] = useState<boolean>(false);
  const [changedItemIndex, setChangedItemIndex] = useState<number>(0);
  
  const setSelectedFlavorsCallback = useCallback(() => {
    if (selectedFlavors.length === 0) setSelectedFlavors(flavors.slice(0,maxFlavors)) ;
  },[selectedFlavors.length, setSelectedFlavors, flavors, maxFlavors]);

  useEffect(() => {
    setSelectedFlavorsCallback()
  }, [setSelectedFlavorsCallback])

  const selectFlavorById = (newItemId: string) => {
    let newSelectedItems = selectedFlavors;
    const newItem = flavors.find(i => i.id === newItemId)

    if (newItem instanceof Flavor) {
      newSelectedItems[changedItemIndex] = newItem;
      setSelectedFlavors(newSelectedItems.slice());
    }
    else {
      console.warn("El item cambiado no pudo ser hallado");
    }
  }

  return <>
    <ModalRecipientes items={flavors} show={show} onHide={() => setShow(false)}
                      selectItemById={selectFlavorById}/>
    <div id="images-container-item-choser" style={{ width: imgWidth, height: imgHeight, maxHeight: imgHeight}}>
      
      {
      selectedFlavors.map((dtItem, i) => {
          const [pictureUrl, title]: [string, string] = [dtItem.pictureUrl, dtItem.title];

          return (
          <div key={i} className="img-container-item-choser"style={{ width: 100/maxFlavors+"%",  left: `${i*100/maxFlavors}%`}} >
            <span onClick={() => {setShow(true); setChangedItemIndex(i);}}>
              <img 
                  className="img-item-choser"
                  style={{ objectPosition:i*100/(maxFlavors-1)+"% 0"}}
                  src={pictureUrl}
                  alt={title}
              />
            </span>
          </div>
      )})}
    </div>
  </>
}

export default ItemChooser;