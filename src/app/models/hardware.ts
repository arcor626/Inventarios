export class Hardware{
    id_hardware:          string;
    hwd_num_serie:        string;
    fk_id_servicio:       string;
    hwd_especificaciones: string;
    fk_id_proveedor:      string;
    hwd_procesador:       string;
    hwd_ram:              string;
    fk_id_encargado:      string;
    fk_id_encarg_ante:    string;
    hwd_fecha_compra:     string;
    hwd_fecha_asignacion: string;
    fk_id_area:           string;
    hwd_comentarios:      string;
    hwd_status: string;
}