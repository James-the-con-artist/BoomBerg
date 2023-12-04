import React, { useState } from 'react';
import './searchstyle.css';

export interface props {
  onPress:any
}

function SearchBar(prop:props) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [skinName, setSkinName] = useState<string>('');
  const [itemName, setItemName] = useState<string>('');

  const handleSelectChange = (event:any) => {
    setSelectedOption(event.target.value);
  };

  const handleItemChange = (event:any) => {
    setItemName(event.target.value);    
  };

  const handleSkinChange = (event:any) => {
    setSkinName(event.target.value);    
  };

  const submit = () => {
    const fullName  = itemName + " | " + skinName + " (" + selectedOption + ")";
    console.log(fullName)
    prop.onPress(fullName);
  }

  return (
    <div className='search-container'>    
      <div className="full-container">
        <div className="container">
          <input
            type="text"
            className="input-common search-input"
            value={itemName} 
            onChange={handleItemChange} 
            placeholder="Item"
          />
        </div>
        <div className="container" >
          <input
            type="text"
            className="input-common search-input"
            value={skinName} 
            onChange={handleSkinChange} 
            placeholder="Skin"
          />
        </div>
        <div className="dropdown-container">
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">Select a Wear</option>
          <option value="Factory New">Factory New</option>
          <option value="Minimal Wear">Minimal Wear</option>
          <option value="Field-Tested ">Field-Tested</option>
          <option value="Well-Worn">Well-Worn</option>
          <option value="Battle-Scarred">Battle-Scarred</option>
        </select>
        </div>

        <input className = "search-button" type="submit" value="Search" onClick={submit}/>
        <text className='heading'>BoomBerg Terminal: Financial AWPortunities</text>
      </div>
      <div className = "border"></div>
    </div>
  );
}

export default SearchBar;