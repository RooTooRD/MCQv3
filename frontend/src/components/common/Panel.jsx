import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import api from '../../js/api';
import DataGridComponent from '../DataGridComponent';


  

  

  

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});



// DemoPageContent.propTypes = {
//   pathname: PropTypes.string.isRequired,
// };






function Panel(props) {


  const { window } = props;

  const [pathname, setPathname] = React.useState('/dashboard');
    
  

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;


//   useEffect(() => {
//     const fetchData = async () => {
//         const { page, pageSize } = paginationModel;
  
//         try {
//           const response = await api.get(`api/questions?page=${page + 1}&limit=${pageSize}`);
//           const data =  response.data;
  
//           // Assuming data.results is an array
//           const newRows = data.results.map(result => ({
//             id: result.id,
//             text: result.text,
//             year: result.year,
//             category: result.category,
//             subcategory: result.subCategory,
//           }));
  
//           setRows((prevArray) => [...prevArray, ...newRows]); // Append new rows
//           // Uncomment if totalRows handling is required
//         setTotalRows(data.count); // Adjust based on your API response structure
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };
  
//       fetchData();
//   }, [paginationModel]);


  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout  defaultSidebarCollapsed>
        <div className='p-8'>
            <h1 className='h1 text-center mb-8'>Questions</h1>
                <DataGridComponent />
        </div>
        
      </DashboardLayout>
    </AppProvider>
  );
}

Panel.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default Panel;