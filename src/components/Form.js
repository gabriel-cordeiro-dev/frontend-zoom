import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  
  background-color: #323238;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;


const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label`
  color: #fff
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #00875F;
  color: white;
  height: 42px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

const CancelButton = styled(Button)`
  background-color: #ff4d4f;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      const data = {
        ano: user.ano.value,
        capacidade: user.capacidade.value,
        mes: user.mes.value,
        type: user.type.value,
      };
    
      console.log(data);

      user.ano.value = onEdit.ano;
      user.capacidade.value = onEdit.capacidade;
      user.mes.value = onEdit.mes;
      user.type.value = onEdit.type;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;
    

    if (
      !user.ano.value ||
      !user.capacidade.value ||
      !user.mes.value ||
      !user.type.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("https://wild-pink-coati-tux.cyclic.app/api/items/" + onEdit.id, {
          ano: user.ano.value,
          capacidade: user.capacidade.value,
          mes: user.mes.value,
          type: user.type.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("https://wild-pink-coati-tux.cyclic.app/api/items", {
          ano: user.ano.value,
          capacidade: user.capacidade.value,
          mes: user.mes.value,
          type: user.type.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.ano.value = "";
    user.capacidade.value = "";
    user.mes.value = "";
    user.type.value = "";

    setOnEdit(null);
    getUsers();
  
  };
  const handleCancel = () => {
    // Limpar os campos do formulário
    const user = ref.current;
    user.ano.value = "";
    user.capacidade.value = "";
    user.mes.value = "";
    user.type.value = "";

    // Limpar a variável onEdit
    setOnEdit(null);
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Ano</Label>
        <Input name="ano" type="text" />
      </InputArea>
      <InputArea>
        <Label>Capacidade</Label>
        <Input name="capacidade" type="text" />
      </InputArea>
      <InputArea>
        <Label>Mês</Label>
        <Input name="mes" type="text" />
      </InputArea>
      <InputArea>
        <Label>Tipo</Label>
        <Input name="type" type="text" />
      </InputArea>

      <ButtonContainer>
        <Button type="submit">SALVAR</Button>
        {onEdit && <CancelButton type="button" onClick={handleCancel}>CANCELAR</CancelButton>}
      </ButtonContainer>
    </FormContainer>
  );
};

export default Form;
