import { useContext, useState } from "react"
import { useRouter } from "next/router"
import { UiContext } from "context/ui/UiContext"
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { AuthContext } from "context/auth/AuthContext"


export const SideMenu = () => {
  
  const router = useRouter()
  const { isMenuOpen, toggleMenu } = useContext(UiContext)
  const { isLoggedIn, user, logout } = useContext(AuthContext)
  const [searchInput, setSearchInput] = useState('')

  const handleSearch = () => {
    if (searchInput.length === 0) return
    navigateTo(`/search/${searchInput}`)
  }

  const navigateTo = (path: string) => {
    toggleMenu()
    router.push(path)
  }

  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        onClose={ toggleMenu }
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            <List>
                <ListItem>
                    <Input
                        autoFocus
                        type='text'
                        placeholder="Buscar..."
                        value={searchInput}
                        onKeyPress={(e) => { e.key === 'Enter' && handleSearch() }}
                        onChange={(e) => setSearchInput(e.target.value)}
                        endAdornment={
                            <InputAdornment 
                                position="end"
                                onClick={handleSearch}
                            >
                                <IconButton
                                aria-label="toggle password visibility"
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>
                {
                    isLoggedIn &&
                    <>
                        <ListItem button>
                            <ListItemIcon>
                                <AccountCircleOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Perfil'} />
                        </ListItem>

                        <ListItem button>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Mis Ordenes'} />
                        </ListItem>
                    </>
                }


                <ListItem 
                    onClick={() => navigateTo('/category/men')} 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                >
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItem>

                <ListItem 
                    onClick={() => navigateTo('/category/women')} 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItem>

                <ListItem 
                    onClick={() => navigateTo('/category/kid')} 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItem>

                {
                    isLoggedIn 
                    ?   <ListItem onClick={logout} button>
                            <ListItemIcon>
                                <LoginOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItem>

                    :   <ListItem 
                            button 
                            onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)} 
                        >
                            <ListItemIcon>
                                <VpnKeyOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItem>
                }

                {/* Admin */}
                {
                    user?.role == 'admin' &&
                    <>
                        <Divider />
                        <ListSubheader>Admin Panel</ListSubheader>

                        <ListItem button>
                            <ListItemIcon>
                                <CategoryOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Productos'} />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ordenes'} />
                        </ListItem>

                        <ListItem button>
                            <ListItemIcon>
                                <AdminPanelSettings/>
                            </ListItemIcon>
                            <ListItemText primary={'Usuarios'} />
                        </ListItem>
                    </>
                }
            </List>
        </Box>
    </Drawer>
  )
}

export default SideMenu