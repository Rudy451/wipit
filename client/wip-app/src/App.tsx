import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import ArtistProfile from "./screens/ArtistProfile";
import ArtistWips from "./screens/ArtistWips";
import ArtistWip from "./components/ArtistWip";
import GalleristProfile from "./screens/GaleristProfile";
import GalleristWips from "./components/GalleristWips";
import { ChakraProvider } from "@chakra-ui/react";
import Register from "./screens/Register";
import Home from "./screens/Home";
import { useMemo, useState } from "react";
import { UserContext, WipCollectionContext, WipContext } from "./userContext";
import Collection from "./screens/Collection";
import methods from './services';

function App(): JSX.Element {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState<string>("");
  const [wipCollection, setWipCollection] = useState<any>(null);
  const [wip, setWip] = useState<any>(null);

  const valueUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  const valueCollection = useMemo(
    () => ({ wipCollection, setWipCollection }),
    [wipCollection, setWipCollection]
  );
  const valueWip = useMemo(() => ({ wip, setWip }), [wip, setWip]);
  return (
    <ChakraProvider>
      <Router>
        <UserContext.Provider value={valueUser}>
          <WipCollectionContext.Provider value={valueCollection}>
            <WipContext.Provider value={valueWip}>
              <Routes>
                <Route path="/" element={<Home setUserType={setUserType} />} />
                <Route
                  path="/register"
                  element={<Register userType={userType} />}
                />
                <Route path="/login" element={<Login userType={userType} />} />
                <Route path={`/a/:profileId`} element={<ArtistProfile />} />
                <Route path="/a/wips" element={<ArtistWips />} />
                <Route path="/a/wip/:title" element={<ArtistWip />} />
                <Route path="/collection" element={<Collection />} />
                <Route path={`/g/:profileId`} element={<GalleristProfile />} />
                <Route path="/g/wips" element={<GalleristWips />} />
              </Routes>
            </WipContext.Provider>
          </WipCollectionContext.Provider>
        </UserContext.Provider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
