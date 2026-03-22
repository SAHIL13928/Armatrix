"use client";

import LiquidEther from "./LiquidEther";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <LiquidEther
  colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
  
  mouseForce={10}        
  cursorSize={80}          
  
  isViscous={false}        
  
  viscous={20}            
  iterationsViscous={8}    
  iterationsPoisson={8}    
  
  resolution={0.3}        
  
  isBounce={false}
  
  autoDemo
  autoSpeed={0.3}         
  autoIntensity={1.5}     
/>
    </div>
  );
}