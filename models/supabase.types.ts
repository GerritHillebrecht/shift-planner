export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          created_at: string
          firstname: string
          id: string
          lastname: string
          phone_number: string | null
          workspace_id: string
        }
        Insert: {
          created_at?: string
          firstname: string
          id?: string
          lastname: string
          phone_number?: string | null
          workspace_id: string
        }
        Update: {
          created_at?: string
          firstname?: string
          id?: string
          lastname?: string
          phone_number?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          created_at: string
          email: string | null
          firstname: string
          id: string
          lastname: string | null
          phone_number: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          firstname: string
          id?: string
          lastname?: string | null
          phone_number?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          firstname?: string
          id?: string
          lastname?: string | null
          phone_number?: string | null
        }
        Relationships: []
      }
      serviceRequirements: {
        Row: {
          client_id: string
          created_at: string
          days_of_week: string
          end_time: string
          icon: string | null
          id: string
          service_name: string
          start_time: string
        }
        Insert: {
          client_id: string
          created_at?: string
          days_of_week: string
          end_time: string
          icon?: string | null
          id?: string
          service_name: string
          start_time: string
        }
        Update: {
          client_id?: string
          created_at?: string
          days_of_week?: string
          end_time?: string
          icon?: string | null
          id?: string
          service_name?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "serviceRequirements_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      shifts: {
        Row: {
          client_id: string
          created_at: string
          date: string
          employee_id: string
          end_time: string | null
          id: string
          requirement_id: string
          start_time: string | null
        }
        Insert: {
          client_id: string
          created_at?: string
          date: string
          employee_id: string
          end_time?: string | null
          id?: string
          requirement_id: string
          start_time?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string
          date?: string
          employee_id?: string
          end_time?: string | null
          id?: string
          requirement_id?: string
          start_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shifts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shifts_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shifts_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "serviceRequirements"
            referencedColumns: ["id"]
          },
        ]
      }
      teammembers: {
        Row: {
          created_at: string
          employee_id: string
          team_id: string
        }
        Insert: {
          created_at?: string
          employee_id: string
          team_id: string
        }
        Update: {
          created_at?: string
          employee_id?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teammembers_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teammembers_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          client_id: string
          created_at: string
          id: string
          team_name: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          team_name: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          team_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace: {
        Row: {
          created_at: string
          id: string
          workspace_name: string
          workspace_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          workspace_name: string
          workspace_type: string
        }
        Update: {
          created_at?: string
          id?: string
          workspace_name?: string
          workspace_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_workspace_type_fkey"
            columns: ["workspace_type"]
            isOneToOne: false
            referencedRelation: "workspaceTypes"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaceTypes: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
