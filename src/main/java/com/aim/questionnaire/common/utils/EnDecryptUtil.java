package com.aim.questionnaire.common.utils;

import org.apache.tomcat.util.codec.binary.Base64;

import java.lang.reflect.Method;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

/**
 * @program: website
 * @author: 王新春
 * @create: 2018-06-21 16:33
 * @description:  Java加密解密工具.3DES SHA1 MD5 BASE64编码 AES加密 Title: EnDecryptUtil.java
 **/

public class EnDecryptUtil {
    // 无需创建对象
    private EnDecryptUtil() {

    }

    public static void main(String[] args) {
//      byte[] arr1 = new byte[] { 1, 2, 3, 4, 5, 6, 7, 22 };
//      System.out.println("SHA1 加密 ： " + SHA1Bit(arr1));
//      System.out.println("SHA1 解密 ： " + SHA1("arr1"));
//      System.out.println("MD5 加密 ： " + MD5Bit(arr1));
//      System.out.println("MD5 加密 ： " + MD5("arr1"));// 54f04b52a75382a157f69457810c41bd
//      System.out.println("BASE64 加密 ： " + encodeBASE64("arr1"));
//      System.out.println("BASE64 解密 ： " + decodeBASE64(encodeBASE64("arr1")));
//      System.out.println("3DES 加密 ： " + d3esEncode("arr1"));
//      System.out.println("d3esDecode(decodeBASE64(encodeBASE64(d3esEncode('arr1')))) = "
//              + d3esDecode(decodeBASE64(encodeBASE64(d3esEncode("arr1")))));
//      System.out.println("3DES 解密 ： " + d3esDecode(d3esEncode("arr1")));
//      System.out.println("AES 加密 ： " + encryptBitAES(arr1, "arr1"));
//      System.out.println("AES 解密 ： " + decryptBitAES(encryptBitAES(arr1, "arr1"), "arr1"));
        String password = EnDecryptUtil.encodeBASE64(EnDecryptUtil.d3esEncode("111111"));
        System.out.println(password);

    }

    /**
     * SHA1加密Bit数据
     *
     * @param source
     *            byte数组
     * @return 加密后的byte数组
     */
    public static byte[] SHA1Bit(byte[] source) {
        try {
            MessageDigest sha1Digest = MessageDigest.getInstance("SHA-1");
            sha1Digest.update(source);
            byte targetDigest[] = sha1Digest.digest();
            return targetDigest;
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * SHA1加密字符串数据
     *
     * @param source
     *            要加密的字符串
     * @return 加密后的字符串
     */
    public static String SHA1(String source) {
        return byte2HexStr(SHA1Bit(source.getBytes()));
    }

    /**
     * MD5加密Bit数据
     *
     * @param source
     *            byte数组
     * @return 加密后的byte数组
     */
    public static byte[] MD5Bit(byte[] source) {
        try {
            // 获得MD5摘要算法的 MessageDigest对象
            MessageDigest md5Digest = MessageDigest.getInstance("MD5");
            // 使用指定的字节更新摘要
            md5Digest.update(source);
            // 获得密文
            return md5Digest.digest();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * MD5加密字符串,32位长
     *
     * @param source
     *            要加密的内容
     * @return 加密后的内容
     */
    public static String MD5(String source) {
        return byte2HexStr(MD5Bit(source.getBytes()));
    }

    /**
     * BASE64编码
     *
     * @param source
     *            要编码的字符串
     * @return 编码过的字符串
     */
    public static String encodeBASE64(String source) {
        Class<?> clazz = null;
        Method encodeMethod = null;
        try {// 优先使用第三方库
            clazz = Class.forName("org.apache.commons.codec.binary.Base64");
            encodeMethod = clazz.getMethod("encodeBase64", byte[].class);
//            System.out.println("encodeBASE64-->" + clazz);
//            System.out.println("encodeMethod-->" + encodeMethod);
            // 反射方法 静态方法执行无需对象
            return new String((byte[]) encodeMethod.invoke(null, source.getBytes()));
        } catch (ClassNotFoundException e) {
            String vm = System.getProperty("java.vm.name");
            System.out.println(vm);
            try {
                if ("Dalvik".equals(vm)) {// Android
                    clazz = Class.forName("android.util.Base64");
                    // byte[] Base64.encode(byte[] input,int flags)
                    encodeMethod = clazz.getMethod("encode", byte[].class, int.class);
                    System.out.println("encodeBASE64-->" + clazz);
                    System.out.println("encodeMethod-->" + encodeMethod);
                    return new String((byte[]) encodeMethod.invoke(null, source.getBytes(), 0));
                } else {// JavaSE/JavaEE
                    clazz = Class.forName("sun.misc.BASE64Encoder");
                    encodeMethod = clazz.getMethod("encode", byte[].class);
                    System.out.println("encodeBASE64-->" + clazz);
                    System.out.println("encodeMethod-->" + encodeMethod);
                    return (String) encodeMethod.invoke(clazz.newInstance(), source.getBytes());
                }
            } catch (ClassNotFoundException e1) {
                return null;
            } catch (Exception e1) {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * BASE64解码
     *
     * @param encodeSource
     *            编码过的字符串
     * @return 编码前的字符串
     */
    public static String decodeBASE64(String encodeSource) {
        Class<?> clazz = null;
        Method decodeMethod = null;

        try {// 优先使用第三方库
            clazz = Class.forName("org.apache.commons.codec.binary.Base64");
            decodeMethod = clazz.getMethod("decodeBase64", byte[].class);
            System.out.println("decodeBASE64-->" + clazz);
            System.out.println("decodeMethod-->" + decodeMethod);
            // 反射方法 静态方法执行无需对象
            return new String((byte[]) decodeMethod.invoke(null, encodeSource.getBytes()));
        } catch (ClassNotFoundException e) {
            String vm = System.getProperty("java.vm.name");
            System.out.println(vm);
            try {
                if ("Dalvik".equals(vm)) {// Android
                    clazz = Class.forName("android.util.Base64");
                    // byte[] Base64.decode(byte[] input, int flags)
                    decodeMethod = clazz.getMethod("decode", byte[].class, int.class);
                    System.out.println("decodeBASE64-->" + clazz);
                    System.out.println("decodeMethod-->" + decodeMethod);
                    return new String((byte[]) decodeMethod.invoke(null, encodeSource.getBytes(), 0));
                } else { // JavaSE/JavaEE
                    clazz = Class.forName("sun.misc.BASE64Decoder");
                    decodeMethod = clazz.getMethod("decodeBuffer", String.class);
                    System.out.println("decodeBASE64-->" + clazz);
                    System.out.println("decodeMethod-->" + decodeMethod);
                    return new String((byte[]) decodeMethod.invoke(clazz.newInstance(), encodeSource));
                }
            } catch (ClassNotFoundException e1) {
                return null;
            } catch (Exception e1) {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * AES加密
     *
     * @param content
     *            待加密的内容
     * @param password
     *            加密密码
     * @return
     */
    public static byte[] encryptBitAES(byte[] content, String password) {
        try {
            Cipher encryptCipher = Cipher.getInstance("AES/ECB/PKCS5Padding");// 创建密码器
            encryptCipher.init(Cipher.ENCRYPT_MODE, getKey(password));// 初始化
            byte[] result = encryptCipher.doFinal(content);
            return result; // 加密
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        // return null;
    }

    /**
     * AES解密
     *
     * @param content
     *            待解密内容
     * @param password
     *            解密密钥
     * @return
     */
    public static byte[] decryptBitAES(byte[] content, String password) {
        try {
            Cipher decryptCipher = Cipher.getInstance("AES/ECB/PKCS5Padding");// 创建密码器
            decryptCipher.init(Cipher.DECRYPT_MODE, getKey(password));// 初始化
            byte[] result = decryptCipher.doFinal(content);
            return result; // 加密结果
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        // return null;
    }

    /**
     * AES字符串加密
     *
     * @param content
     *            待加密的内容
     * @param password
     *            加密密码
     * @return
     */
    public static String encryptAES(String content, String password) {
        return byte2HexStr(encryptBitAES(content.getBytes(), password));
    }

    /**
     * AES字符串解密
     *
     * @param content
     *            待解密内容
     * @param password
     *            解密密钥
     * @return
     */
    public static String decryptAES(String content, String password) {
        return new String(decryptBitAES(hexStr2Bytes(content), password));
    }

    /**
     * 从指定字符串生成密钥
     *
     * @param password
     *            构成该秘钥的字符串
     * @return 生成的密钥
     * @throws NoSuchAlgorithmException
     */
    private static Key getKey(String password) throws NoSuchAlgorithmException {
        SecureRandom secureRandom = new SecureRandom(password.getBytes());
        // 生成KEY
        KeyGenerator kgen = KeyGenerator.getInstance("AES");
        kgen.init(128, secureRandom);
        SecretKey secretKey = kgen.generateKey();
        byte[] enCodeFormat = secretKey.getEncoded();
        // 转换KEY
        SecretKeySpec key = new SecretKeySpec(enCodeFormat, "AES");
        return key;
    }

    /**
     * 将byte数组转换为表示16进制值的字符串. 如：byte[]{8,18}转换为：0812 和 byte[]
     * hexStr2Bytes(String strIn) 互为可逆的转换过程.
     *
     * @param bytes
     *            需要转换的byte数组
     * @return 转换后的字符串
     */
    public static String byte2HexStr(byte[] bytes) {
        int bytesLen = bytes.length;
        // 每个byte用两个字符才能表示，所以字符串的长度是数组长度的两倍
        StringBuffer hexString = new StringBuffer(bytesLen * 2);
        for (int i = 0; i < bytesLen; i++) {
            // 将每个字节与0xFF进行与运算，然后转化为10进制，然后借助于Integer再转化为16进制
            String hex = Integer.toHexString(bytes[i] & 0xFF);
            if (hex.length() < 2) {
                hexString.append(0);// 如果为1位 前面补个0
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    /**
     * 将表示16进制值的字符串转换为byte数组, 和 String byte2HexStr(byte[] bytes) 互为可逆的转换过程.
     *
     * @param strIn
     * @return 转换后的byte数组
     */
    public static byte[] hexStr2Bytes(String strIn) {
        byte[] arrB = strIn.getBytes();
        int iLen = arrB.length;

        // 两个字符表示一个字节，所以字节数组长度是字符串长度除以2
        byte[] arrOut = new byte[iLen / 2];
        for (int i = 0; i < iLen; i = i + 2) {
            String strTmp = new String(arrB, i, 2);
            arrOut[i / 2] = (byte) Integer.parseInt(strTmp, 16);
        }
        return arrOut;
    }

    // 密钥
    private final static String secretKey = "liuyunqiang@lx100$#365#$";
    // 向量
    private final static String iv = "01234567";
    // 加解密统一使用的编码方式
    private final static String encoding = "utf-8";

    /**
     * 3DES加密
     *
     * @param plainText
     *            普通文本
     * @return
     * @throws Exception
     */
    public static String d3esEncode(String plainText) {
        Key deskey = null;
        byte[] encryptData = null;
        try {
            DESedeKeySpec spec = new DESedeKeySpec(secretKey.getBytes());
            SecretKeyFactory keyfactory = SecretKeyFactory.getInstance("desede");
            deskey = keyfactory.generateSecret(spec);

            Cipher cipher = Cipher.getInstance("desede/CBC/PKCS5Padding");
            IvParameterSpec ips = new IvParameterSpec(iv.getBytes());
            cipher.init(Cipher.ENCRYPT_MODE, deskey, ips);
            encryptData = cipher.doFinal(plainText.getBytes(encoding));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Base64.encodeBase64String(encryptData);

    }

    /**
     * 3DES解密
     *
     * @param encryptText
     *            加密文本
     * @return
     * @throws Exception
     */
    public static String d3esDecode(String encryptText) {
        Key deskey = null;
        byte[] decryptData = null;
        String result = "";
        if (null != encryptText && !"".equals(encryptText)) {
            try {
                DESedeKeySpec spec = new DESedeKeySpec(secretKey.getBytes());
                SecretKeyFactory keyfactory = SecretKeyFactory.getInstance("desede");
                deskey = keyfactory.generateSecret(spec);
                Cipher cipher = Cipher.getInstance("desede/CBC/PKCS5Padding");
                IvParameterSpec ips = new IvParameterSpec(iv.getBytes());
                cipher.init(Cipher.DECRYPT_MODE, deskey, ips);

                decryptData = cipher.doFinal(Base64.decodeBase64(encryptText));
                result = new String(decryptData, encoding);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return result;
    }

}
