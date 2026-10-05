package com.example.demo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class StudentController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello IT24B nha nha nha nha nha nha ";
    }

    @GetMapping("/student/{id}")
    public String getStudent(@PathVariable int id) {
        return "Sinh viên có mã: " + id;
    }

    @GetMapping("/student")
    public String greet(@RequestParam String name) {
        return "Xin chào " + name;
    }

    @GetMapping("/searchstudent")
    public String searchStudent(
            @RequestParam String name,
            @RequestParam(defaultValue = "1") int age) {

        return "Tên = " + name + ", tuổi = " + age;
    }

    @GetMapping("/studentjson")
    public Student getStudentJson() {
        return new Student(1, "Huỳnh Khánh Huy", 20);
    }

    @GetMapping("/studentall")
    public List<Student> getStudents() {

        List<Student> list = new ArrayList<>();

        list.add(new Student(1, "Huỳnh Khánh Huy", 20));
        list.add(new Student(2, "Trần Thị Bánh Bèo", 21));

        return list;
    }

    @GetMapping("/getstudent")
    public String getHeader(
            @RequestHeader("Authorization") String authorization) {

        return "Authorization = " + authorization;
    }
}