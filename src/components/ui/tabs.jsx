// src/components/ui/tabs.jsx
export const Tabs = ({ children, className = '', ...props }) => (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
  
  export const TabsList = ({ children }) => (
    <div className="flex space-x-2 mb-4 border-b">
      {children}
    </div>
  );
  
  export const TabsTrigger = ({ children, isActive, ...props }) => (
    <button
      className={`px-4 py-2 -mb-px border-b-2 transition-colors
        ${isActive 
          ? 'border-blue-500 text-blue-600' 
          : 'border-transparent hover:text-blue-600'
        }`}
      {...props}
    >
      {children}
    </button>
  );
  
  export const TabsContent = ({ children }) => (
    <div className="pt-4">
      {children}
    </div>
  ); 