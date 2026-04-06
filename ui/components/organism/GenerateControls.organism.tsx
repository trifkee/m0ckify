"use client";

import useGenerateControls from '@/ui/hooks/useGenerateControls.hook';

import "@/ui/styles/organism/generateControls.new.organism.scss";

export default function GenerateControls() {
  const { handleSelectTab, selectedTab, tabs } = useGenerateControls()

  return (
    <article className="generate__controls controls">
      <div className="selections">
      {
        tabs.map((tab, index) => {
          return (
           <div key={index} className={`selections__tab ${selectedTab === tab.name ? 'active' : ''}`} data-name={tab.name} onClick={() => handleSelectTab(tab.name)}>
            {tab.icon}

            <span className='tab-name'>{tab.name}</span>
          </div>
          )
        })
      }
      </div>
      <div className={`selected-menu ${selectedTab ? 'active' : ''}`}>
        {tabs.find(tab => tab.name === selectedTab)?.component}
      </div>
    </article>
  );
}
