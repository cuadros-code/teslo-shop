import { useContext, useState } from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { UiContext } from "context/ui/UiContext"
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material"
import { CartContext } from "context/cart/CartContext"

export const NavBar = () => {

  const { pathname, push } = useRouter()
  const { toggleMenu } = useContext(UiContext)
  const { cart } = useContext(CartContext)
  const [searchInput, setSearchInput] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const handleSearch = () => {
    if (searchInput.length === 0) return
    push(`/search/${searchInput}`)
  }

  return (
    <AppBar>
      <Toolbar>
        
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex='1' />


        <Box sx={{ display: isSearchVisible ? 'none': { xs: 'none', sm: 'block' } }} >
          <NextLink href="/category/men" passHref>
            <Link>
              <Button color={ pathname == "/category/men" ? 'primary': 'info' } >Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link>
              <Button color={ pathname == "/category/women" ? 'primary': 'info' }>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kid" passHref>
            <Link>
              <Button color={ pathname == "/category/kid" ? 'primary': 'info' }>Niños</Button>
            </Link>
          </NextLink>
        </Box>
        
        <Box flex='1' />
          {
            isSearchVisible 
            ? <Input
                autoFocus
                type='text'
                sx={{ display: { xs: 'none', sm: 'flex' } }}
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
                          onClick={() => setIsSearchVisible(false)}
                        >
                          <ClearOutlined />
                        </IconButton>
                    </InputAdornment>
                }
              />
            : <IconButton
                onClick={() => setIsSearchVisible(true)}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                <SearchOutlined />
              </IconButton> 
          }

        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toggleMenu}
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref>
          <Link>
            <IconButton> 
                <Badge badgeContent={ 10 } color="secondary">
                  <ShoppingCartOutlined />
                </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toggleMenu} >Menú</Button>
        
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
