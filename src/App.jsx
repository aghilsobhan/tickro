import Table from "./Table/Table"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {Toaster} from "react-hot-toast"
function App() {
  const queryClient=new QueryClient({
    defaultOptions:{

      queries:{
        // refetchOnWindowFocus:false,
        // retry:false
      },
    }
  })
  return (
    <QueryClientProvider client={queryClient}>
  <div className="px-5 bg-green-50 h-screen">
    <Table/>
  </div>
  <Toaster
            position="top=center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "white",
              },
            }}
          />
    </QueryClientProvider>
  )
}

export default App
