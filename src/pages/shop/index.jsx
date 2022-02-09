import React from "react";
import Menu from "../../components/Menu";
import { useShop } from "../../context/shop";
import { useNavigate } from "react-router";
import { useStyles } from "./styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { FormatCurrency } from "../../utils/formatCurrency";

function Shop() {
     const { productsShop, setProductsShop } = useShop();
     const [open, setOpen] = React.useState(false);
     const classes = useStyles();
     const navigation = useNavigate();

     // Botão comprar mais produtos
     const navigateHome = () => {
          navigation("/");
     };

     function removeItem(id) {
          const auxList = productsShop.filter((item) => item.id !== id);

          setProductsShop(auxList);
     }

     const handleOpen = () => {
          setOpen(true);
     };

     const handleClose = () => {
          setOpen(false);
          setProductsShop([]);
     };

     return (
          <>
               <Menu />
               <React.Fragment>
                    <Table>
                         <TableHead>
                              <TableRow>
                                   <TableCell>PRODUTO</TableCell>
                                   <TableCell>DESCRIÇÃO</TableCell>
                                   <TableCell>VALOR DO PRODUTO</TableCell>
                                   <TableCell>QUANTIDADE</TableCell>
                                   <TableCell>VALOR FINAL</TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {productsShop.map((productsShop) => (
                                   <TableRow>
                                        <TableCell>
                                             {productsShop.title}
                                        </TableCell>
                                        <TableCell>
                                             {productsShop.description}
                                        </TableCell>
                                        <TableCell>
                                             {FormatCurrency(
                                                  productsShop.value
                                             )}
                                        </TableCell>
                                        <TableCell>
                                             {productsShop.quantidade}
                                        </TableCell>
                                        <TableCell>
                                             {FormatCurrency(
                                                  productsShop.value *
                                                       productsShop.quantidade
                                             )}
                                        </TableCell>
                                        <IconButton
                                             color="text primary"
                                             onClick={() => {
                                                  removeItem(productsShop.id);
                                             }}
                                        >
                                             <DeleteIcon fontSize="large" />
                                        </IconButton>
                                   </TableRow>
                              ))}
                         </TableBody>
                    </Table>
                    <div
                         className={classes.controls}
                         style={{
                              display: "flex",
                              flex: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "60px",
                              height: "25px",
                              borderCollapse: "separate",
                         }}
                    >
                         <Fab
                              variant="extended"
                              className={classes.botao}
                              onClick={() => handleOpen()}
                         >
                              {" "}
                              <h3>Finalizar Compra</h3>
                         </Fab>
                         <Fab
                              variant="extended"
                              className={classes.botao}
                              onClick={() => navigateHome()}
                         >
                              {" "}
                              <h3>Ver mais Produtos</h3>
                         </Fab>
                    </div>
                    <Modal
                         aria-labelledby="transition-modal-title"
                         aria-describedby="transition-modal-description"
                         className={classes.modal}
                         open={open}
                         onClose={handleClose}
                         closeAfterTransition
                         BackdropComponent={Backdrop}
                         BackdropProps={{
                              timeout: 500,
                         }}
                    >
                         <Fade in={open}>
                              <div className={classes.paper}>
                                   <h2 id="transition-modal-title">
                                        {" "}
                                        Sua compra foi realizada com sucesso.
                                   </h2>
                                   <p id="transition-modal-description">
                                        Volte sempre!
                                   </p>
                              </div>
                         </Fade>
                    </Modal>
                    <div
                         style={
                              productsShop.length === 0
                                   ? { display: "flex" }
                                   : { display: "none" }
                         }
                         className={classes.semProduto}
                    >
                         <h1>Você ainda não adicionou nenhum produto</h1>
                    </div>
               </React.Fragment>
          </>
     );
}

export default Shop;
